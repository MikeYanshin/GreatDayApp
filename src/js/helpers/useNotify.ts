import { ElMessage } from "element-plus";

interface IParams {
  message: string;
  duration?: number;
  type: "success" | "warning" | "error" | "info" | undefined;
}
export const showNotify = (params: IParams) => {
  ElMessage({
    type: params.type,
    duration: params.duration,
    dangerouslyUseHTMLString: true,
    message: `<div style='font-family: Helvetica, sans-serif; width: 200px'>${params.message}</div>`,
  });
};
