"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const expertiseAreas = ["Aerial Photography", "Videography", "Surveying & Mapping", "Agriculture", "Inspection", "Security"];
const languagesSpoken = ["English", "Spanish", "French", "German", "Mandarin"];

export function Step2PilotDetails() {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="licenseNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pilot License Number</FormLabel>
            <FormControl>
              <Input placeholder="e.g., FAA12345678" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="certification"
        render={({ field: { onChange, value, ...rest } }) => (
          <FormItem>
            <FormLabel>Pilot Certification Document</FormLabel>
            <FormControl>
              <Input 
                type="file" 
                accept=".pdf,.jpg,.png" 
                onChange={(e) => onChange(e.target.files?.[0])}
                {...rest}
              />
            </FormControl>
            <FormDescription>Upload a copy of your certification (PDF, JPG, PNG).</FormDescription>
            {value && <p className="text-sm text-muted-foreground">File selected: {value.name}</p>}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Years of Experience</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select years of experience" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="0-1">0-1 Years</SelectItem>
                <SelectItem value="1-3">1-3 Years</SelectItem>
                <SelectItem value="3-5">3-5 Years</SelectItem>
                <SelectItem value="5-10">5-10 Years</SelectItem>
                <SelectItem value="10+">10+ Years</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="expertise"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel>Areas of Expertise</FormLabel>
              <FormDescription>Select all that apply.</FormDescription>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {expertiseAreas.map((item) => (
                <FormField
                  key={item}
                  control={control}
                  name="expertise"
                  render={({ field }) => (
                    <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item)}
                          onCheckedChange={(checked) => (
                            checked
                              ? field.onChange([...field.value, item])
                              : field.onChange(field.value?.filter((value: string) => value !== item))
                          )}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{item}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="languages"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel>Languages Spoken</FormLabel>
              <FormDescription>Select all that apply.</FormDescription>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {languagesSpoken.map((item) => (
                <FormField
                  key={item}
                  control={control}
                  name="languages"
                  render={({ field }) => (
                    <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item)}
                          onCheckedChange={(checked) => (
                            checked
                              ? field.onChange([...field.value, item])
                              : field.onChange(field.value?.filter((value: string) => value !== item))
                          )}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{item}</FormLabel>
                    </FormItem>
                  )}
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
