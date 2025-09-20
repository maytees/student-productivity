import { useId } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FileWarning } from "lucide-react"
import Image from "next/image"

interface LabelSelectProps {
    label: string
    sublabel?: string
    description?: string
    icon?: React.ReactNode | string
    checked?: boolean
    onChange?: (checked: boolean) => void
    className?: string
    disabled?: boolean
}

export default function LabelSelect({
    label,
    sublabel,
    description,
    icon,
    checked = false,
    onChange,
    className,
    disabled = false
}: LabelSelectProps) {
    const id = useId()

    const handleChange = (checkedState: boolean) => {
        if (!onChange || disabled) return
        onChange(checkedState)
    }

    const renderIcon = () => {
        if (!icon) return <FileWarning className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />

        if (typeof icon === 'string') {
            return (
                <Image
                    src={icon}
                    alt={`${label} icon`}
                    width={24}
                    height={24}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0"
                />
            )
        }

        return <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center">{icon}</div>
    }

    return (
        <div className={`border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 sm:gap-3 rounded-md border p-3 sm:p-4 shadow-xs outline-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className || ''}`}>
            <Checkbox
                id={id}
                className="order-1 after:absolute after:inset-0 flex-shrink-0 mt-0.5 sm:mt-0"
                aria-describedby={`${id}-description`}
                checked={checked}
                onCheckedChange={handleChange}
                disabled={disabled}
            />
            <div className="flex flex-1 min-w-0 items-start sm:items-center gap-2 sm:gap-3">
                {renderIcon()}
                <div className="grid gap-1 sm:gap-2 min-w-0 flex-1">
                    <Label htmlFor={id} className="text-sm max-w-3xs sm:text-base truncate leading-tight">
                        <span className="break-words truncate">{label}</span>{" "}
                        {sublabel && (
                            <span className="text-muted-foreground text-xs leading-[inherit] font-normal block sm:inline">
                                ({sublabel})
                            </span>
                        )}
                    </Label>
                    {description && (
                        <p id={`${id}-description`} className="text-muted-foreground text-xs sm:text-sm leading-tight break-words">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
