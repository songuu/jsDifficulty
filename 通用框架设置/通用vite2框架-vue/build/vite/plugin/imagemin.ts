/*
 * @Author: songyu
 * @Date: 2021-04-26 09:53:38
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-17 15:20:21
 */
import viteImagemin from 'vite-plugin-imagemin';

export function configImageminPlugin() {
  const plugin = viteImagemin({
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false,
    },
    optipng: {
      optimizationLevel: 7,
    },
    webp: {
      quality: 75,
    },
    mozjpeg: {
      quality: 65,
    },
    pngquant: {
      quality: [0.65, 0.9],
      speed: 4,
    },
    svgo: {
      plugins: [
        {
          removeViewBox: false,
        },
        {
          removeEmptyAttrs: false,
        },
      ],
    },
  });
  return plugin;
}
