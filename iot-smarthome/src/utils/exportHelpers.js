export const exportToCSV = (data, filename) => {
  const headers = ['Timestamp', 'Value'];
  const csvContent = [
    headers.join(','),
    ...data.map(row => [
      new Date(row.timestamp).toISOString(),
      row.value
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
}; 