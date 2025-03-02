const scanBtn = document.getElementById("scanBtn");
const deviceList = document.getElementById("deviceList");
const fileInput = document.getElementById("fileInput");
const sendFileBtn = document.getElementById("sendFileBtn");
const statusDiv = document.getElementById("status");

let selectedDevice = null;
let encryptionKey = null;

// Generate an AES-GCM encryption key
async function generateKey() {
    return crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
}

// Encrypt the file before sending
async function encryptFile(file, key) {
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization Vector (IV)
    const fileData = await file.arrayBuffer();
    
    const encryptedData = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        fileData
    );

    return { encryptedData, iv };
}

// Decrypt the received file
async function decryptFile(encryptedData, iv, key) {
    try {
        const decryptedData = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv },
            key,
            encryptedData
        );

        return new Blob([decryptedData]); // Convert back to file
    } catch (error) {
        console.error("Decryption failed:", error);
    }
}

// Scan for Bluetooth devices
scanBtn.addEventListener("click", async () => {
    statusDiv.innerHTML = "🔍 Scanning for devices...";
    try {
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['generic_access']
        });

        selectedDevice = device;
        encryptionKey = await generateKey(); // Generate encryption key upon connection
        statusDiv.innerHTML = `✅ Connected to: ${device.name}`;
        console.log("Connected to", device.name);
    } catch (error) {
        console.error("Bluetooth scan error:", error);
        statusDiv.innerHTML = "❌ Error scanning for devices!";
    }
});

// Trigger file selection
sendFileBtn.addEventListener("click", () => {
    fileInput.click();
});

// Handle file selection and secure transfer
fileInput.addEventListener("change", async (event) => {
    if (!selectedDevice) {
        alert("⚠️ Please connect to a Bluetooth device first!");
        return;
    }

    const file = event.target.files[0];
    if (file) {
        sendFile(file);
    }
});

// Encrypt & send the file
async function sendFile(file) {
    statusDiv.innerHTML = `🔐 Encrypting & Sending: ${file.name}...`;

    const { encryptedData, iv } = await encryptFile(file, encryptionKey);

    // Convert encrypted data to base64 (simulating transfer)
    const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
    console.log("Encrypted File Data (Base64):", encryptedBase64);

    statusDiv.innerHTML = "✅ Secure file sent!";
}

// Simulated function to receive & decrypt file
async function receiveFile(encryptedBase64, iv) {
    const encryptedArray = new Uint8Array(atob(encryptedBase64).split("").map(c => c.charCodeAt(0)));
    const fileBlob = await decryptFile(encryptedArray, iv, encryptionKey);

    // Create a download link
    const a = document.createElement("a");
    a.href = URL.createObjectURL(fileBlob);
    a.download = "decrypted_file";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    console.log("✅ File decrypted and ready to download!");
}
