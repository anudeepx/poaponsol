export interface EventFormData {
    name: string;
    uri: string;
    startDate: Date;
    endDate: Date;
    maxClaims: number;
}

export interface StepProps {
    formData: EventFormData;
    scheduled?: string;
    updateFormData: (updates: Partial<EventFormData>) => void;
    onNext: () => void;
    onBack: () => void;
    isValid: boolean;
}
