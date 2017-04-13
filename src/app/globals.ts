'use strict';
export const weatherAPIKey:string = "612f4aa40986989c6b698bc2bf4a1b01";
export const weatherZip:string = "33705";
export const weatherCountryCode: string = "us";
export const weatherUri:string = "http://api.openweathermap.org/data/2.5/forecast?zip=" + weatherZip + "," + weatherCountryCode+ "&units=imperial&appid=" + weatherAPIKey;
export const weatherCacheInHours:number = 1;