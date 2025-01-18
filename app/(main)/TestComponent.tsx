// MyTestComponent.tsx
import React from 'react';

export function TestComponent({ children }: { children: React.ReactNode }) {
    return <div className="border border-red-500">{children}</div>;
}

export default TestComponent;
