import { useEffect, useState } from "react";

export function LivePreview({ methods }) {
  const [values, setValues] = useState(methods.getValues()); // Initial form values

  useEffect(() => {
    const subscription = methods.watch((updatedValues) => {
      setValues((prevValues) => {
        if (JSON.stringify(prevValues) !== JSON.stringify(updatedValues)) {
          return updatedValues; // Update only if values have changed
        }
        return prevValues; // No change, keep current state
      });
    });

    const interval = setInterval(() => {
      setValues((prevValues) => {
        const currentValues = methods.getValues();
        if (JSON.stringify(prevValues) !== JSON.stringify(currentValues)) {
          return currentValues; // Update only if values differ
        }
        return prevValues;
      });
    }, 1000);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  }, [methods]);

  return (
    <>
      <h2 className="text-black">Live Preview </h2>
      <pre className="text-black">{JSON.stringify(values, null, 2)}</pre>
    </>
  );
}
