import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mainBgColor: string;
    textColor: string;
    pointColor: string;
    inactive: string;
    link: string;
  }
}
