"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        name="droneModel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Drone Make &amp; Model</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Drone Make &amp; Model" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>DJI</SelectLabel>
                  <SelectItem value="Mavic 3 Classic">Mavic 3 Classic</SelectItem>
                  <SelectItem value="Mavic 3 Enterprise">Mavic 3 Enterprise</SelectItem>
                  <SelectItem value="Mavic 3 Thermal">Mavic 3 Thermal</SelectItem>
                  <SelectItem value="Mavic 3 Multispectral">Mavic 3 Multispectral</SelectItem>
                  <SelectItem value="Mavic 3 Pro">Mavic 3 Pro</SelectItem>
                  <SelectItem value="Mavic 3 Cine">Mavic 3 Cine</SelectItem>
                  <SelectItem value="Mavic 2 Pro">Mavic 2 Pro</SelectItem>
                  <SelectItem value="Mavic 2 Zoom">Mavic 2 Zoom</SelectItem>
                  <SelectItem value="Mavic Air 2">Mavic Air 2</SelectItem>
                  <SelectItem value="Air 2S">Air 2S</SelectItem>
                  <SelectItem value="Mini 3 Pro">Mini 3 Pro</SelectItem>
                  <SelectItem value="Mini 4 Pro">Mini 4 Pro</SelectItem>
                  <SelectItem value="Mini 2 SE">Mini 2 SE</SelectItem>
                  <SelectItem value="Mini SE">Mini SE</SelectItem>
                  <SelectItem value="Phantom 4 Pro V2.0">Phantom 4 Pro V2.0</SelectItem>
                  <SelectItem value="Phantom 4 RTK">Phantom 4 RTK</SelectItem>
                  <SelectItem value="Phantom 4 Multispectral">Phantom 4 Multispectral</SelectItem>
                  <SelectItem value="Phantom 3 Standard">Phantom 3 Standard</SelectItem>
                  <SelectItem value="Phantom 3 Pro">Phantom 3 Pro</SelectItem>
                  <SelectItem value="Phantom 3 Advanced">Phantom 3 Advanced</SelectItem>
                  <SelectItem value="Matrice 30">Matrice 30</SelectItem>
                  <SelectItem value="Matrice 30T">Matrice 30T</SelectItem>
                  <SelectItem value="Matrice 300 RTK">Matrice 300 RTK</SelectItem>
                  <SelectItem value="Matrice 350 RTK">Matrice 350 RTK</SelectItem>
                  <SelectItem value="Matrice 200 Series">Matrice 200 Series</SelectItem>
                  <SelectItem value="Matrice 210 RTK V2">Matrice 210 RTK V2</SelectItem>
                  <SelectItem value="Matrice 600 Pro">Matrice 600 Pro</SelectItem>
                  <SelectItem value="Inspire 2">Inspire 2</SelectItem>
                  <SelectItem value="Inspire 1">Inspire 1</SelectItem>
                  <SelectItem value="Avata FPV">Avata FPV</SelectItem>
                  <SelectItem value="FPV Combo">FPV Combo</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>IdeaForge</SelectLabel>
                  <SelectItem value="NETRA V4">NETRA V4</SelectItem>
                  <SelectItem value="Q Series">Q Series</SelectItem>
                  <SelectItem value="SWITCH VTOL">SWITCH VTOL</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Garuda Aerospace</SelectLabel>
                  <SelectItem value="Kisan Drone">Kisan Drone</SelectItem>
                  <SelectItem value="Surya Drone">Surya Drone</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Asteria Aerospace</SelectLabel>
                  <SelectItem value="A200">A200</SelectItem>
                  <SelectItem value="Genesis">Genesis</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Throttle Aerospace</SelectLabel>
                  <SelectItem value="VARUNA">VARUNA</SelectItem>
                  <SelectItem value="VTOL Drone">VTOL Drone</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Drona Aviation</SelectLabel>
                  <SelectItem value="PlutoX">PlutoX</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>TechEagle</SelectLabel>
                  <SelectItem value="Aquila Delivery Drone">Aquila Delivery Drone</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Parrot</SelectLabel>
                  <SelectItem value="Anafi USA">Anafi USA</SelectItem>
                  <SelectItem value="Anafi AI">Anafi AI</SelectItem>
                  <SelectItem value="Anafi Thermal">Anafi Thermal</SelectItem>
                  <SelectItem value="Bebop 2">Bebop 2</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Yuneec</SelectLabel>
                  <SelectItem value="Typhoon H Plus">Typhoon H Plus</SelectItem>
                  <SelectItem value="Typhoon H3">Typhoon H3</SelectItem>
                  <SelectItem value="H520E">H520E</SelectItem>
                  <SelectItem value="Mantis Q">Mantis Q</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Trinity</SelectLabel>
                  <SelectItem value="Trinity F90+">Trinity F90+</SelectItem>
                  <SelectItem value="Trinity Pro">Trinity Pro</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Custom Built</SelectLabel>
                  <SelectItem value="Quadcopter - Custom">Quadcopter - Custom</SelectItem>
                  <SelectItem value="Hexacopter - Custom">Hexacopter - Custom</SelectItem>
                  <SelectItem value="Octocopter - Custom">Octocopter - Custom</SelectItem>
                  <SelectItem value="Fixed Wing - Custom">Fixed Wing - Custom</SelectItem>
                  <SelectItem value="VTOL Hybrid - Custom">VTOL Hybrid - Custom</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
