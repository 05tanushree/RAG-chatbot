
const genAIAPI = process.env.NEXT_PUBLIC_GEN_AI_API || "http://localhost:8000/";

export const getUploadedFiles = async(): Promise< string[]> => {
    try {
        const response = await fetch(`${genAIAPI}files`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }); 
        if (!response.ok) {
            throw new Error("Failed to fetch files");
        }
        const data = await response.json();

        if(!data || !data.files || !Array.isArray(data.files)) {
            throw new Error("Invalid response format:");    
        }
        if(data.files.length === 0) {
            return [];
        }
        return data.files
    } catch (error) {
        throw error;
    }
}

export const uploadFiles = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('files', file);

    try {
      const res = await fetch(`${genAIAPI}upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
    } catch (err) {
      throw err;
    }
}

export const deleteFile = async (filename: string): Promise<void> => {
    try {
        const res = await fetch(`${genAIAPI}files/${filename}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error("Failed to delete file");
        }
    } catch (error) {
        throw error;
    }       
}

export const getAnswer = async (query: string): Promise<string> => {
    try {
        const res = await fetch(`${genAIAPI}query`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "query":query })
        });
        if (!res.ok) {
            throw new Error("Failed to delete file");
        }
        const data = await res.json();
        if (!data || !data.content || !data.content.answer) {
            throw new Error("Invalid response format");
        }
        return data.content.answer;
    } catch (error) {
        throw error;
    }       
}