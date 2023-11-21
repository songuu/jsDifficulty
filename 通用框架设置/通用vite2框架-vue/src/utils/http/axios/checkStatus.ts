import { useMessage } from '/@/hooks/web/useMessage';
const { createMessage } = useMessage();

export function checkStatus(status: number, msg: string): void {
  switch (status) {
    case 400:
      createMessage({
        type: "error",
        content: "400"
      })
      break;
    case 401:
      createMessage({
        type: "error",
        content: "401"
      })
      break;
    case 403:
      createMessage({
        type: "error",
        content: "403"
      })
      break;
    case 404:
      createMessage({
        type: "error",
        content: "404"
      })
      break;
    case 405:
      createMessage({
        type: "error",
        content: "405"
      })
      break;
    case 408:
      createMessage({
        type: "error",
        content: "408"
      })
      break;
    case 500:
      createMessage({
        type: "error",
        content: "500"
      })
      break;
    case 501:
      createMessage({
        type: "error",
        content: "501"
      })
      break;
    case 502:
      createMessage({
        type: "error",
        content: "502"
      })
      break;
    case 503:
      createMessage({
        type: "error",
        content: "503"
      })
      break;
    case 504:
      createMessage({
        type: "error",
        content: "504"
      })
      break;
    case 505:
      createMessage({
        type: "error",
        content: "505"
      })
      break;
    default:
  }
}
