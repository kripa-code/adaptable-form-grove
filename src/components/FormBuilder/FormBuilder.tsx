import { useState } from "react";
import { FormConfig, FormField as IFormField } from "@/types/form";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import FieldTypes from "./FieldTypes";
import FormFieldComponent from "./FormField";
import FormPreview from "./FormPreview";

const FormBuilder = () => {
  const [form, setForm] = useState<FormConfig>({
    id: "1",
    title: "Untitled Form",
    fields: [],
  });

  const handleAddField = (type: string) => {
    const newField: IFormField = {
      id: crypto.randomUUID(),
      type: type as IFormField["type"],
      label: `New ${type} field`,
      placeholder: "",
      required: false,
    };

    setForm((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));
    toast.success("Field added successfully");
  };

  const handleUpdateField = (id: string, updates: Partial<IFormField>) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      ),
    }));
  };

  const handleDeleteField = (id: string) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.id !== id),
    }));
    toast.success("Field deleted successfully");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setForm((prev) => {
        const oldIndex = prev.fields.findIndex((field) => field.id === active.id);
        const newIndex = prev.fields.findIndex((field) => field.id === over.id);

        return {
          ...prev,
          fields: arrayMove(prev.fields, oldIndex, newIndex),
        };
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="p-6 mb-6">
        <Label>Form Title</Label>
        <Input
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="Enter form title"
          className="text-2xl font-bold"
        />
      </Card>

      <Tabs defaultValue="builder" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="builder">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <FieldTypes onAddField={handleAddField} />
            </div>
            <div className="md:col-span-3">
              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={form.fields} strategy={verticalListSortingStrategy}>
                  {form.fields.map((field) => (
                    <FormFieldComponent
                      key={field.id}
                      field={field}
                      onUpdate={handleUpdateField}
                      onDelete={handleDeleteField}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <FormPreview form={form} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormBuilder;