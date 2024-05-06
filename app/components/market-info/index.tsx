import Image from "next/image";
import React from "react";

import { Maximize3 } from "iconsax-react";

import SolIcon from "@/assets/images/sol-icon.png";

export default function MarketInfo() {
  return (
    <div className="bg-[--bg-card] p-6 rounded-3xl flex justify-between relative">
      <Maximize3 size="20" color="#6E7271" className="absolute top-2 right-2" />
      <div className="container space-y-8">
        <div className="flex flex-nowrap justify-between">
          <div className="flex flex-nowrap items-center space-x-1">
            <div className="avatar">
              <div className="w-6 rounded-full">
                <Image
                  src={SolIcon.src}
                  alt="token-logo"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <span>SOL</span>
          </div>
          <div className="flex flex-nowrap items-center space-x-6">
            <span className="text-secondary text-sm">$185.69</span>
            <span className="text-[--danger] text-sm">-2.44%</span>
            <svg width="110" height="40" viewBox="0 0 134 50" fill="none">
              <path
                d="M1 8.7922L1.91667 8.34177C2.83333 7.89135 4.66667 6.9905 6.5 4.91655C8.33333 2.84261 10.1667 -0.404425 12 1.66145C13.8333 3.72732 15.6667 11.1061 17.5 15.0429C19.3333 18.9796 21.1667 19.4744 23 18.9551C24.8333 18.4358 26.6667 16.9025 28.5 16.2471C30.3333 15.5917 32.1667 15.8143 34 15.5413C35.8333 15.2683 37.6667 14.4997 39.5 13.752C41.3333 13.0043 43.1667 12.2776 45 13.3651C46.8333 14.4527 48.6667 17.3544 50.5 17.968C52.3333 18.5815 54.1667 16.9068 56 17.0565C57.8333 17.2061 59.6667 19.1801 61.5 19.9268C63.3333 20.6736 65.1667 20.1931 67 20.2858C68.8333 20.3785 70.6667 21.0444 72.5 25.1891C74.3333 29.3338 76.1667 36.9573 78 37.1373C79.8333 37.3173 81.6667 30.0538 83.5 28.9857C85.3333 27.9175 87.1667 33.0447 89 36.357C90.8333 39.6693 92.6667 41.1668 94.5 43.1189C96.3333 45.071 98.1667 47.4779 100 45.715C101.833 43.9522 103.667 38.0196 105.5 37.4564C107.333 36.8932 109.167 41.6995 111 44.7046C112.833 47.7098 114.667 48.9139 116.5 48.2717C118.333 47.6294 120.167 45.1408 122 44.4759C123.833 43.811 125.667 44.9697 127.5 46.0276C129.333 47.0856 131.167 48.0428 132.083 48.5214L133 49"
                stroke="#CC3904"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-nowrap justify-between">
          <div className="flex flex-nowrap items-center space-x-1">
            <div className="avatar">
              <div className="w-6 rounded-full">
                <Image
                  src={SolIcon.src}
                  alt="token-logo"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <span>SOL</span>
          </div>
          <div className="flex flex-nowrap items-center space-x-6">
            <span className="text-secondary text-sm">$185.69</span>
            <span className="text-[--danger] text-sm">-2.44%</span>
            <svg width="110" height="40" viewBox="0 0 134 50" fill="none">
              <path
                d="M1 8.7922L1.91667 8.34177C2.83333 7.89135 4.66667 6.9905 6.5 4.91655C8.33333 2.84261 10.1667 -0.404425 12 1.66145C13.8333 3.72732 15.6667 11.1061 17.5 15.0429C19.3333 18.9796 21.1667 19.4744 23 18.9551C24.8333 18.4358 26.6667 16.9025 28.5 16.2471C30.3333 15.5917 32.1667 15.8143 34 15.5413C35.8333 15.2683 37.6667 14.4997 39.5 13.752C41.3333 13.0043 43.1667 12.2776 45 13.3651C46.8333 14.4527 48.6667 17.3544 50.5 17.968C52.3333 18.5815 54.1667 16.9068 56 17.0565C57.8333 17.2061 59.6667 19.1801 61.5 19.9268C63.3333 20.6736 65.1667 20.1931 67 20.2858C68.8333 20.3785 70.6667 21.0444 72.5 25.1891C74.3333 29.3338 76.1667 36.9573 78 37.1373C79.8333 37.3173 81.6667 30.0538 83.5 28.9857C85.3333 27.9175 87.1667 33.0447 89 36.357C90.8333 39.6693 92.6667 41.1668 94.5 43.1189C96.3333 45.071 98.1667 47.4779 100 45.715C101.833 43.9522 103.667 38.0196 105.5 37.4564C107.333 36.8932 109.167 41.6995 111 44.7046C112.833 47.7098 114.667 48.9139 116.5 48.2717C118.333 47.6294 120.167 45.1408 122 44.4759C123.833 43.811 125.667 44.9697 127.5 46.0276C129.333 47.0856 131.167 48.0428 132.083 48.5214L133 49"
                stroke="#CC3904"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
