import React from "react";
import { COMPARISON_MODELS, ModelSpec } from "./ModelComparer";
import { Info, Sliders, Check } from "lucide-react";

interface DeviceParametersProps {
  docId: string;
}

export default function DeviceParameters({ docId }: DeviceParametersProps) {
  const model = COMPARISON_MODELS.find((m) => m.id === docId);

  if (!model) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-neutral-200 rounded-2xl bg-neutral-50/50">
        <Info size={28} className="text-neutral-400 mb-2" />
        <h3 className="text-sm font-semibold text-neutral-800 font-sans">No specifications found</h3>
        <p className="text-xs text-neutral-500 mt-1 max-w-sm">
          Specific parameters for this document or section are not available in our comparison database.
        </p>
      </div>
    );
  }

  const specGroups = [
    {
      title: "Basic Specifications",
      specs: [
        { label: "Product Model", value: model.modelCode, isCode: true },
        { label: "Product Name", value: model.name },
        { label: "Dimensions", value: model.dimensions },
        { label: "Net Weight", value: model.weight },
        { label: "Material", value: model.material },
      ],
    },
    {
      title: "Acoustic & Hardware",
      specs: [
        { label: "Audio Sensor / Capture Rig", value: model.microphone },
        { label: "Pickup Angle", value: model.pickupAngle },
        { label: "Interactive Control", value: model.interactiveControl },
        { label: "App / Client Support", value: model.appSupport },
      ],
    },
    {
      title: "Connectivity & Power",
      specs: [
        { label: "Connection Type", value: model.connectivity },
        { label: "Transmission Frequency", value: model.frequency },
        { label: "Working Distance", value: model.distance },
        { label: "Battery / Power Source", value: model.battery },
        { label: "Charging Interface", value: model.charging },
        { label: "Charging Time", value: model.chargingTime },
        { label: "Working Time", value: model.workingTime },
      ],
    },
  ];

  // Add advanced specifications if available
  if (model.additionalFeatures || model.localStorage) {
    specGroups.push({
      title: "Advanced Features & Storage",
      specs: [
        ...(model.additionalFeatures ? [{ label: "Additional Features", value: model.additionalFeatures }] : []),
        ...(model.localStorage ? [{ label: "Local Storage Buffer", value: model.localStorage }] : []),
      ],
    });
  }

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* Introduction Header */}
      <div className="bg-neutral-50/80 border border-neutral-200/60 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
        <div className="p-2.5 bg-neutral-900 text-white rounded-xl shrink-0 shadow-sm">
          <Sliders size={20} />
        </div>
        <div>
          <h2 className="text-base font-bold text-neutral-900 font-sans flex items-center gap-2">
            Technical Specifications Table
          </h2>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed max-w-2xl">
            Detailed hardware profiles, acoustic parameters, wireless frequencies, and electrical characteristics for the {model.name} ({model.modelCode}).
          </p>
        </div>
      </div>

      {/* Structured Specification Table */}
      <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Parameter / Dimension
                </th>
                <th className="px-6 py-3.5 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Specifications & Performance Metrics
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {specGroups.map((group, groupIdx) => (
                <React.Fragment key={groupIdx}>
                  {/* Group Header Row */}
                  <tr className="bg-neutral-50/50">
                    <td 
                      colSpan={2} 
                      className="px-6 py-2.5 text-xs font-bold text-neutral-700 uppercase tracking-wider bg-neutral-50 border-y border-neutral-200/60"
                    >
                      {group.title}
                    </td>
                  </tr>
                  {/* Group Rows */}
                  {group.specs.map((spec, specIdx) => (
                    <tr 
                      key={specIdx} 
                      className="hover:bg-neutral-50/40 transition-all"
                    >
                      <td className="px-6 py-3.5 text-[13.5px] font-semibold text-neutral-500">
                        {spec.label}
                      </td>
                      <td className="px-6 py-3.5 text-[13.5px] text-neutral-600 font-medium leading-relaxed">
                        {spec.isCode ? (
                          <code className="font-mono text-[11.5px] px-1.5 py-0.5 bg-neutral-100 border border-neutral-200/50 text-neutral-800 rounded">
                            {spec.value}
                          </code>
                        ) : (
                          spec.value || <span className="text-neutral-300">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
