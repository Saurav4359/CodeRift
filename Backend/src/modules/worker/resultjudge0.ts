import { getResult } from "../judge/execution";

export async function Result(token: string) {
  let result;
  for (let i = 0; i < 30; i++) {
    result = await getResult(token);

    if (result.status.id != 1 && result.status.id != 2) {
      return result;
    }
    await new Promise((res) => setTimeout(res, 200));
  }
  return -1;
}
