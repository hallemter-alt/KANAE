import { NextRequest, NextResponse } from 'next/server';

// Sample property data
const properties = [
  {
    id: 1,
    type: 'rent',
    title: 'モダンな1LDKマンション',
    price: 85000,
    location: '東京都渋谷区',
    rooms: '1LDK',
    area: 35,
    features: ['駅近', 'ペット可', '南向き'],
  },
  {
    id: 2,
    type: 'rent',
    title: 'ファミリー向け2LDK',
    price: 120000,
    location: '東京都世田谷区',
    rooms: '2LDK',
    area: 55,
    features: ['駐車場あり', 'リノベーション済み'],
  },
  {
    id: 3,
    type: 'sale',
    title: '新築マンション',
    price: 58000000,
    location: '東京都港区',
    rooms: '3LDK',
    area: 70,
    features: ['新築', '駅近', 'オートロック'],
  },
  {
    id: 4,
    type: 'sale',
    title: '一戸建て',
    price: 72000000,
    location: '神奈川県横浜市',
    rooms: '4LDK',
    area: 120,
    features: ['庭付き', '駐車場2台', '南向き'],
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type'); // rent or sale
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  let filteredProperties = [...properties];

  // Filter by type
  if (type) {
    filteredProperties = filteredProperties.filter(p => p.type === type);
  }

  // Filter by price range
  if (minPrice) {
    const min = parseInt(minPrice);
    filteredProperties = filteredProperties.filter(p => p.price >= min);
  }

  if (maxPrice) {
    const max = parseInt(maxPrice);
    filteredProperties = filteredProperties.filter(p => p.price <= max);
  }

  return NextResponse.json({
    success: true,
    count: filteredProperties.length,
    properties: filteredProperties,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.price || !body.type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real app, save to database
    const newProperty = {
      id: properties.length + 1,
      ...body,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      property: newProperty,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
