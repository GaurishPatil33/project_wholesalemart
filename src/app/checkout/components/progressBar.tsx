"use client";
import React from "react";
import { motion } from "framer-motion";

export interface Step {
  id: number;
  label: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="w-full px-6 py-1 md:py-3 bg-white">
      <div className="flex items-center justify-between relative w-full">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div
              key={step.id}
              className="flex-1 flex flex-col items-center relative"
            >
              <div className=" relative w-full flex items-center justify-center">
                {/* Circle */}
                <button
                  onClick={() => onStepClick?.(step.id)}
                  className={` size-5 md:size-7 p-1 flex items-center justify-center rounded-full border-2 text-xs font-medium z-10
                    ${isCompleted ? "bg-blue-400 text-white border-white " : ""}
                    ${isActive ? "bg-blue-600 text-white border-blue-600" : ""}
                    ${
                      !isCompleted && !isActive
                        ? "bg-gray-200 text-gray-600 border-gray-400"
                        : ""
                    }
                    `}
                >
                  {isCompleted ? "✓" : step.id}
                </button>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 left-1/2 w-full h-[2px] -translate-y-1/2">
                    {/* Gray base line */}
                    <div className="absolute left-0 right-0 top-0 w-full h-[2px] bg-gray-300" />
                    {/* Animated progress */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: isCompleted ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                      className="absolute left-0 top-0 h-[2px] bg-blue-600"
                    />
                  </div>
                )}
              </div>
              {/* Label */}
              <span
                className={`mt-2 text-xs font-medium ${
                  isActive
                    ? "text-gray-800 text-sm"
                    : isCompleted
                    ? "text-blue-400 "
                    : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
