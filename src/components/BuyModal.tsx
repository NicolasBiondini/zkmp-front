import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";

type Props = { children: JSX.Element };

const BuyModal = ({ children }: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    // Suponiendo que solo se permite un archivo, puedes ajustarlo según sea necesario
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "message/rfc822": [".eml"], // Aceptar archivos .eml
    },
  });

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="dark text-foreground">
        <DialogHeader>
          <DialogTitle>Upload your email to generate the proof!</DialogTitle>
          <DialogDescription>
            You have to upload the mercado pago email to generate the proof.
            Please upload it here.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full h-full  flex-col  ">
          {file ? (
            <div className="w-full h-full flex justify-center items-center flex-col gap-3">
              {" "}
              <h1>Email selected! 🎉</h1>
              <Button className="w-full" variant={"secondary"}>
                Generate proof 🔏
              </Button>
            </div>
          ) : (
            <div
              {...getRootProps({
                className:
                  "w-full h-[90px] hover:bg-primary  transition-all border border-primary border-dotted cursor-pointer flex justify-center items-center rounded-lg",
              })}
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuyModal;
