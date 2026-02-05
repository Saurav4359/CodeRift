import { supabase } from "./uploadFile";

export const DownloadFile = async (path: string) => {
  const { data, error } = await supabase.storage
    .from("TestCase")
    .download(path);
  return data?.text();
};

// const result = await DownloadFile("VisibleTestCase/OUTPUT/file1");
// console.log(result);
