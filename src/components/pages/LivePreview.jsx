import { useEffect, useState } from "react";

function LivePreview({ methods }) {
  const [values, setValues] = useState(methods.getValues()); // Initialize with current form values

  useEffect(() => {
    const subscription = methods.watch((updatedValues) => {
      setValues(updatedValues); // Update state when form changes
    });

    const interval = setInterval(() => {
      setValues(methods.getValues()); // Update values every second
    }, 1000);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval); // Clean up both subscription and interval
    };
  }, [methods]);

  return (
    <>
      <h2>Live Preview (Updated every 1 second)</h2>
      <pre className="text-black">{JSON.stringify(values, null, 2)}</pre>
    </>
  );
}

export default LivePreview;
