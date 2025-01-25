import { FormConfig } from "@/types/form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormPreviewProps {
  form: FormConfig;
}

const FormPreview = ({ form }: FormPreviewProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">{form.title}</h2>
      <form className="space-y-6">
        {form.fields.map((field) => (
          <div key={field.id}>
            <Label className="mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {field.type === 'textarea' ? (
              <Textarea
                placeholder={field.placeholder}
                required={field.required}
              />
            ) : (
              <Input
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
          </div>
        ))}
      </form>
    </Card>
  );
};

export default FormPreview;