"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

const availabilityOptions = ["Weekdays (Mon-Fri)", "Weekends (Sat-Sun)", "Evenings", "Custom Schedule (discuss per-project)"];

export function Step4Availability() {
  const { control, watch } = useFormContext();
  const serviceRadius = watch("serviceRadius");

  return (
    <div className="space-y-8">
      <FormField
        control={control}
        name="serviceRadius"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Service Radius</FormLabel>
            <div className="flex items-center gap-4 pt-2">
              <FormControl>
                <Slider
                  min={1}
                  max={500}
                  step={10}
                  defaultValue={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              </FormControl>
              <span className="font-bold w-20 text-center rounded-md border p-2">{serviceRadius} mi</span>
            </div>
            <FormDescription>The maximum distance you are willing to travel from your location for a project.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="willingToTravel"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel>Willing to Travel Beyond Service Radius?</FormLabel>
              <FormDescription>
                For larger projects, are you open to traveling further?
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="availability"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel>General Availability</FormLabel>
              <FormDescription>Select your typical availability.</FormDescription>
            </div>
            <div className="space-y-2">
              {availabilityOptions.map((item) => (
                <FormField
                  key={item}
                  control={control}
                  name="availability"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== item
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
