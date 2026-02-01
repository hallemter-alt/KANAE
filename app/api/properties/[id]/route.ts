/**
 * Individual Property API Route
 * GET /api/properties/[id]
 * Fetches detailed information for a single property
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      );
    }

    // Fetch the property from Supabase
    const { data: property, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_stations (
          walk_time,
          distance_meters,
          is_primary,
          station:stations (
            id,
            station_name,
            line:lines (
              id,
              line_name
            )
          )
        )
      `)
      .eq('id', id)
      .eq('deleted_at', null)
      .single();

    if (error) {
      console.error('Error fetching property:', error);
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Transform the data to match the expected format
    const transformedProperty = {
      id: property.id,
      property_name: property.property_name || property.name,
      property_type: property.property_type,
      price: property.price,
      address_full: property.address_full || property.location,
      yield_surface: property.yield_surface || property.yield_expected,
      building_structure: property.building_structure || property.structure,
      total_units: property.total_units,
      land_area: property.land_area,
      building_area: property.building_area,
      completion_year: property.completion_year || 
        (property.completion_date ? new Date(property.completion_date).getFullYear() : null),
      description: property.description || property.description_ja,
      image_url: property.image_urls?.[0] || property.image_url,
      features: property.features || [],
      access_stations: property.property_stations?.map((ps: any) => ({
        line: ps.station?.line?.line_name || '',
        station: ps.station?.station_name || '',
        walk_minutes: ps.walk_time || 0,
      })) || [],
    };

    // Increment view count (asynchronously, don't wait)
    supabase
      .from('properties')
      .update({ 
        view_count: (property.view_count || 0) + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .then(() => {
        console.log(`View count incremented for property ${id}`);
      })
      .catch((error) => {
        console.error('Error incrementing view count:', error);
      });

    return NextResponse.json(transformedProperty);
  } catch (error) {
    console.error('Error in property detail API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
