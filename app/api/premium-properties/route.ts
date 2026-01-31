/**
 * Premium Properties API Route
 * Handles property search, filtering, and retrieval
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getPremiumProperties,
  getFeaturedProperties,
  searchProperties,
  recordPropertySearch,
} from '@/lib/services/premium-property-service';
import type { PropertyFilterParams } from '@/lib/types/premium-property';

export const dynamic = 'force-dynamic';

/**
 * GET /api/premium-properties
 * Search and filter premium properties
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Check if this is a featured properties request
    const featuredOnly = searchParams.get('featured') === 'true';
    const featuredLimit = searchParams.get('featured_limit');
    
    if (featuredOnly) {
      const limit = featuredLimit ? parseInt(featuredLimit) : 4;
      const properties = await getFeaturedProperties(limit);
      return NextResponse.json({
        properties,
        total_count: properties.length,
        page: 1,
        limit,
        total_pages: 1,
      });
    }

    // Check if this is a keyword search
    const keyword = searchParams.get('keyword');
    if (keyword) {
      const properties = await searchProperties(keyword);
      return NextResponse.json({
        properties,
        total_count: properties.length,
        page: 1,
        limit: properties.length,
        total_pages: 1,
      });
    }

    // Build filter parameters from query string
    const filters: PropertyFilterParams = {};

    // Price range
    const priceMin = searchParams.get('price_min');
    const priceMax = searchParams.get('price_max');
    if (priceMin) filters.price_min = parseInt(priceMin);
    if (priceMax) filters.price_max = parseInt(priceMax);

    // Yield range
    const yieldMin = searchParams.get('yield_min');
    const yieldMax = searchParams.get('yield_max');
    if (yieldMin) filters.yield_min = parseFloat(yieldMin);
    if (yieldMax) filters.yield_max = parseFloat(yieldMax);

    // Location
    const prefecture = searchParams.get('prefecture');
    const city = searchParams.get('city');
    if (prefecture) filters.prefecture = prefecture;
    if (city) filters.city = city;

    // Completion year range
    const completionMin = searchParams.get('completion_year_min');
    const completionMax = searchParams.get('completion_year_max');
    if (completionMin) filters.completion_year_min = parseInt(completionMin);
    if (completionMax) filters.completion_year_max = parseInt(completionMax);

    // Structure types
    const structureTypes = searchParams.get('structure_types');
    if (structureTypes) {
      filters.structure_types = structureTypes.split(',') as any[];
    }

    // Boolean feature filters
    const booleanFilters = [
      'has_iot',
      'has_face_recognition',
      'has_soundproof',
      'is_minpaku_operating',
      'has_rental_guarantee',
      'has_smart_home',
      'near_park',
      'multi_line_access',
      'urban_planning_benefit',
    ];

    booleanFilters.forEach(filter => {
      const value = searchParams.get(filter);
      if (value === 'true') {
        (filters as any)[filter] = true;
      }
    });

    // Feature codes
    const featureCodes = searchParams.get('feature_codes');
    if (featureCodes) {
      filters.feature_codes = featureCodes.split(',');
    }

    // Category codes
    const categoryCodes = searchParams.get('category_codes');
    if (categoryCodes) {
      filters.category_codes = categoryCodes.split(',');
    }

    // Status filter
    const status = searchParams.get('status');
    if (status) {
      filters.status = status.split(',') as any[];
    }

    // Featured only
    const featuredOnlyParam = searchParams.get('featured_only');
    if (featuredOnlyParam === 'true') {
      filters.featured_only = true;
    }

    // Sorting
    const sortBy = searchParams.get('sort_by');
    if (sortBy) {
      filters.sort_by = sortBy as any;
    }

    // Pagination
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    if (page) filters.page = parseInt(page);
    if (limit) filters.limit = parseInt(limit);

    // Execute search
    const result = await getPremiumProperties(filters);

    // Record search for analytics (optional)
    const sessionId = request.headers.get('x-session-id') || 'anonymous';
    await recordPropertySearch(sessionId, filters, result.total_count);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in premium properties API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

/**
 * Example usage:
 * 
 * Get featured properties:
 * GET /api/premium-properties?featured=true&featured_limit=4
 * 
 * Search by keyword:
 * GET /api/premium-properties?keyword=神楽坂
 * 
 * Filter by price and yield:
 * GET /api/premium-properties?price_min=500000000&price_max=900000000&yield_min=4.0
 * 
 * Filter by features:
 * GET /api/premium-properties?has_iot=true&is_minpaku_operating=true
 * 
 * Filter by categories:
 * GET /api/premium-properties?category_codes=minpaku_ready,high_tech
 * 
 * Sort and paginate:
 * GET /api/premium-properties?sort_by=yield_desc&page=1&limit=12
 */
