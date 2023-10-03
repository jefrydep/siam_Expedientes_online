"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightCircle, X } from "lucide-react";

const FilesPage = () => {
  const data = [
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
  ];
  return (
    <div className="w-full">
      <section className="bg-white border-b-2  px-2 py-1">
        <h4 className="font-bold mb-4">MODULO NUEVOS EXPEDIENTES</h4>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 justify-center ">
          <div>
            <Label className="mb-3  ">RUC</Label>
            <Input type="text" placeholder="RUC" />
          </div>
          <div>
            <Label className="mb-3  ">Entidad/Institución</Label>
            <Input type="text" placeholder="Entidad/institucion" />
          </div>
          <div>
            <Label className="mb-3  ">Documento</Label>
            <Input type="text" placeholder="Tipo de documento" />
          </div>
          <div>
            <Label className="mb-3  ">N° de documento</Label>
            <Input type="text" placeholder="Documento" />
          </div>
          <div>
            <Label className="mb-3  ">Procedimiento</Label>
            <Input type="text" placeholder="Procedimiento" />
          </div>

          {/* <Select>
            <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                {data.map((persons, index) => (
                  <div key={index}>
                    <SelectItem value=" name">{persons.name}</SelectItem>
                  </div>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select> */}
        </div>
        <div className="grid w-full gap-1.5 mb-3">
          <Label htmlFor="message">Asunto</Label>
          <Textarea placeholder="Type your message here." id="message" />
        </div>
        <div className="flex gap-3">
          <Button>
            <ArrowRightCircle /> Siguiente
          </Button>
          <Button variant={"destructive"}>
            <X />
            Salir
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FilesPage;
