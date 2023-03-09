import { geolocation } from '@vercel/edge';
import { NextRequest, NextResponse } from 'next/server';
// import countries from './lib/countries.json';

// run only on homepage
export const config = {
  matcher: '/',
}

export async function middleware(request) {
  const url = new URL(request.url);

  const { country } = geolocation(request);
  // You can also get the country using dot notation on the function
  // const country = geolocation(request).country;

  if (country === 'RU') {
    url.pathname = 'https://google.com';
  } else {
    url.pathname = 'https://www.youtube.com';
  }


  // const { nextUrl: url, geo } = req
  // const country = geo.country || 'US'
  // const city = geo.city || 'San Francisco'
  // const region = geo.region || 'CA'
  //
  // const countryInfo = countries.find((x) => x.cca2 === country)
  //
  // const currencyCode = Object.keys(countryInfo.currencies)[0]
  // const currency = countryInfo.currencies[currencyCode]
  // const languages = Object.values(countryInfo.languages).join(', ')
  //
  // url.searchParams.set('country', country)
  // url.searchParams.set('city', city)
  // url.searchParams.set('region', region)
  // url.searchParams.set('currencyCode', currencyCode)
  // url.searchParams.set('currencySymbol', currency.symbol)
  // url.searchParams.set('name', currency.name)
  // url.searchParams.set('languages', languages)

  return NextResponse.redirect(url)
}
