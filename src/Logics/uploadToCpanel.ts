export const uploadFileToCpanelServer = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    // Your PHP server endpoint URL
    const response = await fetch("https://uploader.flekkeroyil.com/index.php", {
      method: "POST",
      body: formData    
    });

    if (!response.ok) {
      throw new Error("File upload failed");
    }

    const result = await response.json();
console.log(result);
    if (result && result.url) {
      return result.url;
    } else {
      console.error("Upload response missing URL:", result);
      return null;
    }
  } catch (error) {
    console.log(error);
    console.error("Upload error:", error);
    return null;
  }
};
