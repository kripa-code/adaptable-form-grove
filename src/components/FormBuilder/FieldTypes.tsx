import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Type, Hash, Mail, AlignLeft } from "lucide-react";

interface FieldTypeProps {
  onAddField: (type: string) => void;
}

const FieldTypes = ({ onAddField }: FieldTypeProps) => {
  const fieldTypes = [
    { type: 'text', icon: <Type className="w-4 h-4" />, label: 'Text' },
    { type: 'number', icon: <Hash className="w-4 h-4" />, label: 'Number' },
    { type: 'email', icon: <Mail className="w-4 h-4" />, label: 'Email' },
    { type: 'textarea', icon: <AlignLeft className="w-4 h-4" />, label: 'Text Area' },
  ];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Field Types</h3>
      <div className="space-y-2">
        {fieldTypes.map((field) => (
          <Button
            key={field.type}
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => onAddField(field.type)}
          >
            {field.icon}
            {field.label}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default FieldTypes;