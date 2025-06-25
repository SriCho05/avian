"use client";

import { useState } from "react";
import { useForm, FormProvider, FieldName, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { Step1PersonalDetails } from "@/components/auth/Step1PersonalDetails";
import { Step2PilotDetails } from "@/components/auth/Step2PilotDetails";
import { Step3DroneEquipment } from "@/components/auth/Step3DroneEquipment";
import { Step4Availability } from "@/components/auth/Step4Availability";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const formSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  location: z.string().min(2, "Please enter a location"),
  licenseNumber: z.string().min(5, "Please enter a valid license number"),
  certification: z.instanceof(File, { message: "Certification document is required." }).refine(file => file.size > 0, "Certification document is required."),
  experience: z.string().min(1, "Please select years of experience"),
  expertise: z.array(z.string()).min(1, "Select at least one area of expertise"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  droneType: z.string().min(1, "Please select a drone type"),
  modelAndSpecs: z.string().min(10, "Please provide model and specs"),
  payloadCapabilities: z.string().min(5, "Please provide payload capabilities"),
  insurance: z.instanceof(File, { message: "Insurance document is required." }).refine(file => file.size > 0, "Insurance document is required."),
  serviceRadius: z.number().min(1),
  willingToTravel: z.boolean(),
  availability: z.array(z.string()).min(1, "Please select your availability"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 1, name: 'Personal Details', fields: ['fullName', 'phone', 'email', 'password', 'confirmPassword', 'location'] },
  { id: 2, name: 'Pilot Details', fields: ['licenseNumber', 'certification', 'experience', 'expertise', 'languages'] },
  { id: 3, name: 'Drone Equipment', fields: ['droneType', 'modelAndSpecs', 'payloadCapabilities', 'insurance'] },
  { id: 4, name: 'Availability & Review', fields: ['serviceRadius', 'willingToTravel', 'availability'] },
];

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      location: "",
      licenseNumber: "",
      certification: undefined,
      experience: "",
      expertise: [],
      languages: [],
      droneType: "",
      modelAndSpecs: "",
      payloadCapabilities: "",
      insurance: undefined,
      willingToTravel: false,
      serviceRadius: 50,
      availability: [],
    }
  });

  const { trigger, handleSubmit } = methods;

  const handleNextStep = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName<FormData>[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1);
    }
  };

  const onInvalid = (errors: FieldErrors) => {
    console.error("Form validation failed:", errors);
    const errorKeys = Object.keys(errors);

    if (errorKeys.length > 0) {
      const firstErrorField = errorKeys[0] as FieldName<FormData>;
      const errorStepIndex = steps.findIndex(step => step.fields.includes(firstErrorField));
      
      let description = "Please fill out all required fields on every step and try again.";
      if (errorStepIndex !== -1) {
        const errorStep = steps[errorStepIndex];
        description = `Please review Step ${errorStep.id}: ${errorStep.name} for errors.`;
        if (errorStepIndex !== currentStep) {
          setCurrentStep(errorStepIndex);
        }
      }

      toast({
        variant: "destructive",
        title: "Incomplete Form",
        description: description,
      });
    }
  };
  
  const processForm = async (data: FormData) => {
    setIsSubmitting(true);
    
    // We can't save files in Excel, so we'll just save their names.
    const { password, confirmPassword, certification, insurance, ...formDataForExcel } = data;

    const pilotData = {
      ...formDataForExcel,
      certificationFile: certification.name,
      insuranceFile: insurance.name,
      submittedAt: new Date().toISOString(),
    };

    try {
        const worksheet = XLSX.utils.json_to_sheet([pilotData]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Pilots");
    
        // This will trigger a download of the file
        XLSX.writeFile(workbook, "PilotRegistrations.xlsx");
    
        // Redirect to confirmation page
        router.push("/confirmation");

    } catch (error: any) {
        console.error("Failed to generate Excel file:", error);
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "Could not generate the registration file. Please try again.",
        });
        setIsSubmitting(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <>
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep].name}</CardTitle>
          <CardDescription>Step {currentStep + 1} of {steps.length}</CardDescription>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(processForm, onInvalid)}>
            <CardContent>
              {currentStep === 0 && <Step1PersonalDetails />}
              {currentStep === 1 && <Step2PilotDetails />}
              {currentStep === 2 && <Step3DroneEquipment />}
              {currentStep === 3 && <Step4Availability />}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                Previous
              </Button>
               {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={handleNextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit for Review'}
                </Button>
              )}
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </>
  );
}
