
export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

// Initial mock documents
const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Getting Started with Writing',
    content: '<p>Welcome to your new writing app! This is a simple guide to help you get started with the features.</p><p>Use the toolbar above to format your text, add headings, and more. Your work is automatically saved as you type.</p>',
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2023-05-12'),
    userId: '1'
  },
  {
    id: '2',
    title: 'My First Novel',
    content: '<p>It was a dark and stormy night. The wind howled through the trees, sending shivers down my spine.</p><p>I knew I had to keep moving, but my legs felt heavy, like they were made of lead.</p>',
    createdAt: new Date('2023-05-14'),
    updatedAt: new Date('2023-05-15'),
    userId: '1'
  }
];

// Get documents for a specific user
export const getUserDocuments = (userId: string): Document[] => {
  return [...mockDocuments.filter(doc => doc.userId === userId)];
};

// Get a single document
export const getDocument = (documentId: string): Document | undefined => {
  return mockDocuments.find(doc => doc.id === documentId);
};

// Create a new document
export const createDocument = (userId: string, title: string = 'Untitled Document'): Document => {
  const newDoc: Document = {
    id: String(mockDocuments.length + 1),
    title,
    content: '<p>Start writing your masterpiece...</p>',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId
  };
  
  mockDocuments.push(newDoc);
  return newDoc;
};

// Update a document
export const updateDocument = (documentId: string, updates: Partial<Document>): Document => {
  const index = mockDocuments.findIndex(doc => doc.id === documentId);
  
  if (index === -1) {
    throw new Error('Document not found');
  }
  
  const updatedDoc = {
    ...mockDocuments[index],
    ...updates,
    updatedAt: new Date()
  };
  
  mockDocuments[index] = updatedDoc;
  return updatedDoc;
};

// Delete a document
export const deleteDocument = (documentId: string): void => {
  const index = mockDocuments.findIndex(doc => doc.id === documentId);
  
  if (index !== -1) {
    mockDocuments.splice(index, 1);
  }
};
