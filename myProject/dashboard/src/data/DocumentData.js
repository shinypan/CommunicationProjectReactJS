/**
 * Document data component.
 * Used to contain Document CRUD operations
 * @type {React.FC}
 */

const DocumentData = (() => {
  const getDocuments = () => {
    const documents = localStorage.getItem("documents");
    return documents ? JSON.parse(documents) : [];
  };

  return {
    //Retrieve all documents for all users
    getDocumentList: (userId) => {
      debugger;
      return getDocuments();
    },

    //Retrieve document by ownerId
    getDocumentsByOwnerId: (userId) => {
      const allDocuments = getDocuments();
      const userDocuments = allDocuments.filter(
        (doc) => doc.ownerId === userId
      );

      return userDocuments;
    },

    //Retrieve document by Id
    getDocumentById: (id) => {
      const documents = getDocuments();
      return documents.find((doc) => doc.id == id);
    },
    //Save document to local storage
    saveDocument: (document) => {
      const documents = getDocuments();
      documents.push(document);
      localStorage.setItem("documents", JSON.stringify(documents));
    },

    //delete document by Id
    deleteDocument: (id) => {
      let documents = getDocuments();
      documents = documents.filter((doc) => doc.id != id);
      localStorage.setItem("documents", JSON.stringify(documents));
    },

    //Push all documents to local storage
    saveDocuments: (documents) => {
      localStorage.setItem("documents", JSON.stringify(documents));
    },
  };
})();

export default DocumentData;
