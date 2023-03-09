import { geolocation } from '@vercel/edge';
import { NextRequest, NextResponse } from 'next/server';
import countries from './lib/countries.json';

// run only on homepage
export const config = {
  matcher: '/',
}

export async function middleware(request) {
  const { nextUrl: url, geo } = request;


  if (geolocation(request).country === 'RU' ) {
    return NextResponse.redirect('https://google.com');
  }

  const country = geo.country || 'US'
  const city = geo.city || 'San Francisco'
  const region = geo.region || 'CA'

  const countryInfo = countries.find((x) => x.cca2 === country)
  const currencyCode = Object.keys(countryInfo.currencies)[0]
  const currency = countryInfo.currencies[currencyCode]
  const languages = Object.values(countryInfo.languages).join(', ')

  url.searchParams.set('country', country)
  url.searchParams.set('city', city)
  url.searchParams.set('region', region)
  url.searchParams.set('currencyCode', currencyCode)
  url.searchParams.set('currencySymbol', currency.symbol)
  url.searchParams.set('name', currency.name)
  url.searchParams.set('languages', languages)

  return NextResponse.redirect(url)
}
