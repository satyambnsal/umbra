type ObjectWithA = { txHash: string; [key: string]: any };

export function mergeTxWithReceipt(arr1: ObjectWithA[], arr2: ObjectWithA[]): ObjectWithA[] {
  const mergedMap = new Map<string, ObjectWithA>();

  // Process arr1
  arr1.forEach(obj => mergedMap.set(obj.txHash, { ...obj }));

  // Process arr2 and merge with existing objects
  arr2.forEach(obj => {
    const existing = mergedMap.get(obj.txHash);
    if (existing) {
      mergedMap.set(obj.txHash, { ...existing, ...obj });
    } else {
      mergedMap.set(obj.txHash, { ...obj });
    }
  });

  return Array.from(mergedMap.values());
}
