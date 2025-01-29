import OptimizedTreeDataGrid from '@/src/shared/ui/tree-table';
import type { GridColDef } from '@mui/x-data-grid';

// Example data structure 1: File system
const fileSystemData = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    children: [
      { id: '2', name: 'Report.docx', type: 'file', size: '25 KB' },
      { id: '3', name: 'Presentation.pptx', type: 'file', size: '5 MB' },
    ],
  },
  {
    id: '4',
    name: 'Images',
    type: 'folder',
    children: [
      { id: '5', name: 'Photo1.jpg', type: 'file', size: '2 MB' },
      { id: '6', name: 'Photo2.png', type: 'file', size: '3 MB' },
    ],
  },
];

const fileSystemColumns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'type', headerName: 'Type', width: 100 },
  { field: 'size', headerName: 'Size', width: 100 },
];

// Example data structure 2: Organization chart
const orgChartData = [
  {
    id: '1',
    name: 'John Doe',
    title: 'CEO',
    subordinates: [
      {
        id: '2',
        name: 'Jane Smith',
        title: 'CTO',
        subordinates: [
          { id: '4', name: 'Bob Johnson', title: 'Senior Developer' },
          { id: '5', name: 'Alice Williams', title: 'Senior Developer' },
        ],
      },
      {
        id: '3',
        name: 'Mike Brown',
        title: 'CFO',
        subordinates: [
          { id: '6', name: 'Carol Davis', title: 'Financial Analyst' },
        ],
      },
    ],
  },
];

const orgChartColumns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'title', headerName: 'Title', width: 200 },
];

export function Organizations() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Organization Chart Example</h1>
      <OptimizedTreeDataGrid
        data={orgChartData}
        columns={orgChartColumns}
        getChildrenField={(node) => node.subordinates}
        expandField="name"
      />
    </div>
  );
}
