import { FormField as FormFieldType } from "@/types/form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical, X } from "lucide-react";

interface FormFieldProps {
  field: FormFieldType;
  onUpdate: (id: string, updates: Partial<FormFieldType>) => void;
  onDelete: (id: string) => void;
}

const FormField = ({ field, onUpdate, onDelete }: FormFieldProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="p-4 mb-4 relative"
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab hover:text-blue-500"
        >
          <GripVertical className="w-5 h-5" />
        </div>
        <button
          onClick={() => onDelete(field.id)}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Field Label</Label>
          <Input
            value={field.label}
            onChange={(e) => onUpdate(field.id, { label: e.target.value })}
            placeholder="Enter field label"
          />
        </div>

        <div>
          <Label>Placeholder</Label>
          <Input
            value={field.placeholder || ""}
            onChange={(e) => onUpdate(field.id, { placeholder: e.target.value })}
            placeholder="Enter placeholder text"
          />
        </div>

        <div className="flex items-center gap-2">
          <Label>Required</Label>
          <Switch
            checked={field.required}
            onCheckedChange={(checked) => onUpdate(field.id, { required: checked })}
          />
        </div>
      </div>
    </Card>
  );
};

export default FormField;