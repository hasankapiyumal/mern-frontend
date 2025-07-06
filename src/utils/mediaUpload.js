import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast"

export default function uploadMediaFileHandler(file){
return new Promise((reslove,reject)=>{
    if(file==null||file==undefined){
      toast.error("No file selected for upload");
      return;
    }

    let fileName=file.name;
    const extension =fileName.split('.').pop();
    if(extension!="jpg"|| extension !="png" || extension !="jpeg"){
      toast.error("Only jpg, png and jpeg files are allowed");
      return;
    }

    const timestamp = Date.now();
    fileName=timestamp+"."+extension;

    const supabase =createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_PUBLIC_Key);
    supabase.storage.from("images").upload(fileName,file,{
        cacheControl: "3600",
        upsert: false
    }).then(()=>{
         const imageURL=supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
         console.log("File uploaded successfully:", imageURL);
         reslove(imageURL);
            toast.success("File uploaded successfully: ");

    }).catch((error)=>{
        console.error("Error uploading file:", error);
        toast.error("Error uploading file: " + error.message);
        reject(error);
    })

})
}