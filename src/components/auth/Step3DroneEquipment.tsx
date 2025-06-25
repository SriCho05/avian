"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Step3DroneEquipment() {
  const { control } = useFormContext();
  
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="droneType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Drone Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a drone type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="quadcopter">Quadcopter</SelectItem>
                <SelectItem value="fixed-wing">Fixed-Wing</SelectItem>
                <SelectItem value="vtol">VTOL (Vertical Take-Off and Landing)</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="modelAndSpecs"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Drone Model & Specs</FormLabel>
            <FormControl>
              <Textarea placeholder="e.g., DJI Mavic 3 Pro, 4/3 CMOS Hasselblad Camera, 43-min max flight time..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="payloadCapabilities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payload Capabilities</FormLabel>
            <FormControl>
              <Textarea placeholder="e.g., Lidar sensor, multispectral camera, thermal camera, max payload 2kg..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="insurance"
        render={({ field: { onChange, value, ...rest } }) => (
          <FormItem>
            <FormLabel>Drone Insurance Document</FormLabel>
            <FormControl>
               <Input 
                type="file" 
                accept=".pdf,.jpg,.png" 
                onChange={(e) => onChange(e.target.files?.[0])}
                {...rest}
              />
            </FormControl>
            <FormDescription>Upload a copy of your drone insurance policy.</FormDescription>
            {value && <p className="text-sm text-muted-foreground">File selected: {value.name}</p>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
