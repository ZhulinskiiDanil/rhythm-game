import { LevelButton } from "@/types";
import { createLevel } from "@/common/funcs/createLevel";

const buttons: LevelButton[] = [
  { fromSecond: 0.701311, type: 'normal', column: 1 },
  { fromSecond: 0.88343, type: 'normal', column: 2 },
  { fromSecond: 1.071266, type: 'normal', column: 1 },
  { fromSecond: 1.260887, type: 'normal', column: 2 },
  { fromSecond: 1.451196, type: 'normal', column: 4 },
  { fromSecond: 1.638369, type: 'normal', column: 3 },
  { fromSecond: 1.827433, type: 'normal', column: 4 },
  { fromSecond: 2.011109, type: 'normal', column: 3 },
  { fromSecond: 2.177657, type: 'normal', column: 2 },
  { fromSecond: 2.354176, type: 'normal', column: 3 },
  { fromSecond: 2.544317, type: 'normal', column: 4 },
  { fromSecond: 2.725779, type: 'normal', column: 2 },
  { fromSecond: 2.916131, type: 'normal', column: 3 },
  { fromSecond: 3.289282, type: 'normal', column: 1 },
  { fromSecond: 3.627629, type: 'normal', column: 2 },
  { fromSecond: 3.986771, type: 'normal', column: 4 },
  { fromSecond: 4.172065, type: 'normal', column: 4 },
  { fromSecond: 4.350067, type: 'normal', column: 1 },
  { fromSecond: 4.690972, type: 'normal', column: 1 },
  { fromSecond: 4.874763, type: 'normal', column: 2 },
  { fromSecond: 5.053686, type: 'normal', column: 2 },
  { fromSecond: 5.404523, type: 'normal', column: 1 },
  { fromSecond: 5.592435, type: 'normal', column: 4 },
  { fromSecond: 5.778382, type: 'normal', column: 2 },
  { fromSecond: 6.088022, type: 'normal', column: 1 },
  { fromSecond: 6.283956, type: 'normal', column: 3 },
  { fromSecond: 6.472677, type: 'normal', column: 1 },
  { fromSecond: 6.663261, type: 'normal', column: 1 },
  { fromSecond: 6.854222, type: 'normal', column: 1 },
  { fromSecond: 7.036128, type: 'normal', column: 2 },
  { fromSecond: 7.220031, type: 'normal', column: 1 },
  { fromSecond: 7.5532, type: 'normal', column: 4 },
  { fromSecond: 7.880252, type: 'normal', column: 1 },
  { fromSecond: 8.268353, type: 'normal', column: 1 },
  { fromSecond: 8.453628, type: 'normal', column: 3 },
  { fromSecond: 8.640718, type: 'normal', column: 1 },
  { fromSecond: 8.987816, type: 'normal', column: 1 },
  { fromSecond: 9.331439, type: 'normal', column: 1 },
  { fromSecond: 9.701083, type: 'normal', column: 2 },
  { fromSecond: 9.887979, type: 'normal', column: 4 },
  { fromSecond: 10.066982, type: 'normal', column: 2 },
  { fromSecond: 10.26927, type: 'normal', column: 2 },
  { fromSecond: 10.462301, type: 'normal', column: 2 },
  { fromSecond: 10.653442, type: 'normal', column: 4 },
  { fromSecond: 10.830474, type: 'normal', column: 2 },
  { fromSecond: 11.015376, type: 'normal', column: 3 },
  { fromSecond: 11.201132, type: 'normal', column: 4 },
  { fromSecond: 11.376901, type: 'normal', column: 1 },
  { fromSecond: 11.564276, type: 'normal', column: 2 },
  { fromSecond: 11.891532, type: 'normal', column: 4 },
  { fromSecond: 12.226336, type: 'normal', column: 4 },
  { fromSecond: 12.59921, type: 'normal', column: 4 },
  { fromSecond: 12.932105, type: 'normal', column: 1 },
  { fromSecond: 13.128258, type: 'normal', column: 4 },
  { fromSecond: 13.405518, type: 'normal', column: 2 },
  { fromSecond: 13.803207, type: 'normal', column: 1 },
  { fromSecond: 14.011259, type: 'normal', column: 3 },
  
  // Pause
  { fromSecond: 17.736848, type: 'normal', column: 2 },
  { fromSecond: 17.927856, type: 'normal', column: 2 },
  { fromSecond: 18.094056, type: 'normal', column: 1 },
  { fromSecond: 18.429295, type: 'normal', column: 2 },
  { fromSecond: 18.952288, type: 'normal', column: 2 },
  { fromSecond: 19.145133, type: 'normal', column: 3 },
  { fromSecond: 19.309668, type: 'normal', column: 4 },
  { fromSecond: 19.463187, type: 'normal', column: 3 },
  { fromSecond: 19.791472, type: 'normal', column: 2 },
  { fromSecond: 20.378347, type: 'normal', column: 1 },
  { fromSecond: 20.56018, type: 'normal', column: 3 },
  { fromSecond: 20.731174, type: 'normal', column: 2 },
  { fromSecond: 20.915086, type: 'normal', column: 4 },
  { fromSecond: 21.109286, type: 'normal', column: 1 },
  { fromSecond: 21.301986, type: 'normal', column: 3 },
  { fromSecond: 21.476015, type: 'normal', column: 2 },
  { fromSecond: 21.651122, type: 'normal', column: 4 },
  { fromSecond: 21.835981, type: 'normal', column: 1 },
  { fromSecond: 22.008074, type: 'normal', column: 2 },
  { fromSecond: 22.174977, type: 'normal', column: 3 },
  { fromSecond: 22.353093, type: 'normal', column: 4 },
  { fromSecond: 22.524786, type: 'normal', column: 3 },
  { fromSecond: 22.701066, type: 'normal', column: 2 },
  { fromSecond: 23.284346, type: 'normal', column: 1 },
  { fromSecond: 23.456919, type: 'normal', column: 4 },
  { fromSecond: 23.633051, type: 'normal', column: 1 },
  { fromSecond: 23.798376, type: 'normal', column: 3 },
  { fromSecond: 23.96907, type: 'normal', column: 2 },
  { fromSecond: 24.154131, type: 'normal', column: 3 },
  { fromSecond: 24.708451, type: 'normal', column: 1 },
  { fromSecond: 24.882191, type: 'normal', column: 2 },
  { fromSecond: 25.052038, type: 'normal', column: 3 },
  { fromSecond: 25.228078, type: 'normal', column: 1 },
  { fromSecond: 25.403002, type: 'normal', column: 2 },
  { fromSecond: 25.597164, type: 'normal', column: 3 },
  { fromSecond: 26.158138, type: 'normal', column: 4 },
  { fromSecond: 26.342058, type: 'normal', column: 3 },
  { fromSecond: 26.508199, type: 'normal', column: 2 },
  { fromSecond: 26.679044, type: 'normal', column: 3 },
  { fromSecond: 26.847959, type: 'normal', column: 2 },
  { fromSecond: 27.02921, type: 'normal', column: 1 },
  { fromSecond: 27.214984, type: 'normal', column: 2 },
  { fromSecond: 27.385992, type: 'normal', column: 1 },
  { fromSecond: 27.565097, type: 'normal', column: 3 },
  { fromSecond: 27.74911, type: 'normal', column: 4 },
  { fromSecond: 27.921045, type: 'normal', column: 3 },
  { fromSecond: 28.102023, type: 'normal', column: 4 },
  { fromSecond: 28.271033, type: 'normal', column: 3 },
  { fromSecond: 28.445163, type: 'normal', column: 4 },
  { fromSecond: 28.835996, type: 'normal', column: 3 },
  { fromSecond: 29.217103, type: 'normal', column: 2 },
  { fromSecond: 29.431146, type: 'normal', column: 1 },
  { fromSecond: 29.652922, type: 'normal', column: 3 },
  { fromSecond: 30.092179, type: 'normal', column: 3 },
  { fromSecond: 30.274482, type: 'normal', column: 3 },
  { fromSecond: 30.44396, type: 'normal', column: 4 },
  { fromSecond: 30.629243, type: 'normal', column: 4 },
  { fromSecond: 30.891112, type: 'normal', column: 4 },
  { fromSecond: 31.114021, type: 'normal', column: 2 },
  { fromSecond: 31.500144, type: 'normal', column: 2 },
  { fromSecond: 31.692219, type: 'normal', column: 2 },
  { fromSecond: 31.863208, type: 'normal', column: 4 },
  { fromSecond: 32.059036, type: 'normal', column: 3 },
  { fromSecond: 32.317601, type: 'normal', column: 4 },
  { fromSecond: 32.475234, type: 'normal', column: 3 },
  { fromSecond: 32.820062, type: 'normal', column: 2 },
  { fromSecond: 32.993952, type: 'normal', column: 1 },

  { fromSecond: 33.244091, type: "normal", column: 1 },
  { fromSecond: 33.522796, type: "normal", column: 4 },
  { fromSecond: 33.779175, type: "normal", column: 3 },
  { fromSecond: 33.972146, type: "normal", column: 2 },
  { fromSecond: 34.138659, type: "normal", column: 1 },
  { fromSecond: 34.294037, type: "normal", column: 2 },

  // ko re vo nine nine nine
  { fromSecond: 34.507431, type: "normal", column: 1 },
  { fromSecond: 34.681975, type: "normal", column: 2 },
  { fromSecond: 34.840371, type: "normal", column: 3 },
  { fromSecond: 35.001328, type: "normal", column: 2 },
  { fromSecond: 35.188902, type: "normal", column: 2 },
  { fromSecond: 35.404867, type: "normal", column: 2 },
  
  // ko re vo nine nine nine
  { fromSecond: 35.913434, type: 'normal', column: 4 },
  { fromSecond: 36.100078, type: 'normal', column: 3 },
  { fromSecond: 36.273054, type: 'normal', column: 2 },
  { fromSecond: 36.438987, type: 'normal', column: 3 },
  { fromSecond: 36.626096, type: 'normal', column: 3 },
  { fromSecond: 36.824113, type: 'normal', column: 3 },

  { fromSecond: 37.348129, type: 'normal', column: 1 },
  { fromSecond: 37.538003, type: 'normal', column: 2 },
  { fromSecond: 37.714285, type: 'normal', column: 3 },
  { fromSecond: 37.888671, type: 'normal', column: 2 },
  { fromSecond: 38.072226, type: 'normal', column: 1 },
  { fromSecond: 38.252244, type: 'normal', column: 2 },

  { fromSecond: 38.585167, type: 'normal', column: 3 },
  { fromSecond: 38.771201, type: 'normal', column: 2 },
  { fromSecond: 38.957966, type: 'normal', column: 3 },

  { fromSecond: 39.262983, type: 'normal', column: 4 },
  { fromSecond: 39.544802, type: 'normal', column: 1 },
  { fromSecond: 39.722295, type: 'normal', column: 2 },
  { fromSecond: 39.891479, type: 'normal', column: 4 },
  { fromSecond: 40.064083, type: 'normal', column: 3 },

  // New part
  { fromSecond: 40.428244, type: 'normal', column: 2 },
  { fromSecond: 40.606304, type: 'normal', column: 3 },
  { fromSecond: 40.782658, type: 'normal', column: 2 },

  { fromSecond: 41.143283, type: 'normal', column: 3 },
  { fromSecond: 41.327594, type: 'normal', column: 3 },

  { fromSecond: 41.656622, type: 'normal', column: 4 },
  { fromSecond: 41.974374, type: 'normal', column: 1 },
  
  { fromSecond: 42.391293, type: 'normal', column: 1 },
  { fromSecond: 42.593316, type: 'normal', column: 1 },
  { fromSecond: 42.769505, type: 'normal', column: 4 },
  { fromSecond: 42.949153, type: 'normal', column: 3 },

  { fromSecond: 43.30214, type: 'normal', column: 1 },
  { fromSecond: 43.486192, type: 'normal', column: 3 },
  { fromSecond: 43.652194, type: 'normal', column: 2 },

  { fromSecond: 44.018387, type: 'normal', column: 4 },
  { fromSecond: 44.185386, type: 'normal', column: 2 },
  { fromSecond: 44.34948, type: 'normal', column: 3 },

  { fromSecond: 44.693344, type: 'normal', column: 1 },
  { fromSecond: 44.868431, type: 'normal', column: 1 },
  { fromSecond: 45.038278, type: 'normal', column: 4 },
  { fromSecond: 45.218272, type: 'normal', column: 1 },
  { fromSecond: 45.387147, type: 'normal', column: 4 },
  { fromSecond: 45.558254, type: 'normal', column: 1 },
  { fromSecond: 45.719396, type: 'normal', column: 4 },
  { fromSecond: 45.872183, type: 'normal', column: 1 },
  
  { fromSecond: 46.25946, type: 'normal', column: 1 },
  { fromSecond: 46.43479, type: 'normal', column: 1 },
  { fromSecond: 46.59316, type: 'normal', column: 1 },

  { fromSecond: 46.962148, type: 'normal', column: 1 },
  { fromSecond: 47.146195, type: 'normal', column: 1 },

  { fromSecond: 47.485978, type: 'normal', column: 4 },
  { fromSecond: 47.485978, type: 'normal', column: 2 },
  { fromSecond: 47.818768, type: 'normal', column: 1 },
  { fromSecond: 47.818768, type: 'normal', column: 3 },

  { fromSecond: 48.230084, type: 'normal', column: 2 },
  { fromSecond: 48.425239, type: 'normal', column: 3 },
  { fromSecond: 48.603649, type: 'normal', column: 2 },
  { fromSecond: 48.764491, type: 'normal', column: 1 },

  { fromSecond: 49.141614, type: 'normal', column: 2 },
  { fromSecond: 49.325022, type: 'normal', column: 3 },
  { fromSecond: 49.486428, type: 'normal', column: 2 },

  { fromSecond: 49.8024, type: 'normal', column: 1 },
  { fromSecond: 50.119303, type: 'normal', column: 3 },
  { fromSecond: 50.407395, type: 'normal', column: 4 },
  { fromSecond: 50.657371, type: 'normal', column: 2 },

  { fromSecond: 51.096344, type: 'normal', column: 1 },
  { fromSecond: 51.280131, type: 'normal', column: 2 },
  { fromSecond: 51.280131, type: 'normal', column: 4 },

  { fromSecond: 51.456241, type: 'normal', column: 1 },
  { fromSecond: 51.633679, type: 'normal', column: 2 },

  { fromSecond: 51.803456, type: 'normal', column: 1 },
  { fromSecond: 51.97307, type: 'normal', column: 2 },
  { fromSecond: 51.97307, type: 'normal', column: 4 },

  { fromSecond: 52.140529, type: 'normal', column: 1 },
  { fromSecond: 52.296095, type: 'normal', column: 2 },

  { fromSecond: 52.852793, type: 'normal', column: 2 },
  { fromSecond: 52.852793, type: 'normal', column: 3 },
  { fromSecond: 53.075768, type: 'normal', column: 2 },
  { fromSecond: 53.075768, type: 'normal', column: 3 }
]

export const yoasobiIdol = createLevel({
  name: 'Yoasobi Idol',
  columns: 4,
  songPath: '/tracks/yoasobi-idol.mp3',
  speed: 2.5,
  ignoreLose: false,
  startFrom: 0,
  buttons
})