import * as React from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import { CheckIcon, ChevronDown, ChevronUp } from "lucide-react";
import styles from "./custom-select.module.scss";

export type SelectOption = {
  value: string;
  label: string;
};

interface SelectProps {
  options: SelectOption[];
  placeholder?: React.ReactNode;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  hideChevron?: boolean;
}

const CustomSelect = ({
  options,
  placeholder = "Select an option...",
  label,
  value,
  onChange,
  className,
  disabled = false,
  hideChevron = false,
}: SelectProps) => {
  return (
    <Select.Root value={value} onValueChange={onChange} disabled={disabled}>
      <Select.Trigger
        className={classnames(styles.Trigger, className)}
        aria-label={label}
      >
        <Select.Value placeholder={placeholder} />
        {!hideChevron && (
          <Select.Icon className={styles.Icon}>
            <ChevronDown size={16} />
          </Select.Icon>
        )}
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={styles.Content}>
          <Select.ScrollUpButton className={styles.ScrollButton}>
            <ChevronUp size={16} />
          </Select.ScrollUpButton>

          <Select.Viewport className={styles.Viewport}>
            {label && (
              <Select.Group>
                <Select.Label className={styles.Label}>{label}</Select.Label>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select.Group>
            )}
            {!label &&
              options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
          </Select.Viewport>

          <Select.ScrollDownButton className={styles.ScrollButton}>
            <ChevronDown size={16} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof Select.Item> {
  children: React.ReactNode;
  className?: string;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames(styles.Item, className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className={styles.ItemIndicator}>
          <CheckIcon size={16} />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

export default CustomSelect;
