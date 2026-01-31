/**
 * Premium Property Detail API Route
 * Handles individual property retrieval with related data
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getPremiumPropertyWithDetails,
  getSimilarProperties,
} from '@/lib/services/premium-property-service';

export const dynamic = 'force-dynamic';

/**
 * GET /api/premium-properties/[id]
 * Get detailed information for a specific property
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Get property with related features and categories
    const property = await getPremiumPropertyWithDetails(id);

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Get similar properties
    const similarProperties = await getSimilarProperties(id, 3);

    return NextResponse.json({
      property,
      similar_properties: similarProperties,
    });
  } catch (error) {
    console.error('Error fetching property detail:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property details' },
      { status: 500 }
    );
  }
}

/**
 * Example usage:
 * 
 * Get property details:
 * GET /api/premium-properties/KN-001
 * 
 * Response includes:
 * - Full property details
 * - Associated special features
 * - Investment categories
 * - Similar properties
 */
