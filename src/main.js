const { createApp, ref, reactive, computed, onMounted, watch } = Vue;

    createApp({
      setup() {
        // --- 8-STAGE WORKFLOW PIPELINE ---
        const pipelineStages = [
          'Confirmation Call',
          'Courier Booking',
          'Factory Submit',
          'Courier Pending',
          'Delivered',
          'Partial Delivered',
          'Returned from Customer',
          'Returned Received'
        ];

        // --- SEEDING DEFAULT USERS ---
        const defaultUsers = [
          { id: 'u1', username: 'admin1', password: 'master', name: 'Admin User', role: 'admin', active: true, target: 0 },
          { id: 'u2', username: 'seller1', password: '1234', name: 'Tanvir Hossain', role: 'seller', active: true, target: 300000 },
          { id: 'u3', username: 'seller2', password: '1234', name: 'Ariful Ahmed', role: 'seller', active: true, target: 300000 },
          { id: 'u4', username: 'seller3', password: '1234', name: 'Farah Naz', role: 'seller', active: true, target: 300000 }
        ];

        // --- SEEDING DEFAULT FACTORIES ---
        const defaultFactories = [
          { id: 'f1', name: 'Apex Crafting Hub', phone: '01711002233', waGroupLink: 'https://chat.whatsapp.com/sample-apex-hub', fabricQuality: 5, stockStatus: 'In Stock', baseWholesaleCost: 40000, notes: 'Premium velvet upholstery specialist with fast turnarounds.' },
          { id: 'f2', name: 'Royal Heritage Workshop', phone: '01819001122', waGroupLink: 'https://chat.whatsapp.com/sample-royal-heritage', fabricQuality: 4, stockStatus: 'In Stock', baseWholesaleCost: 38000, notes: 'Teak wood frames and linen couch sets.' },
          { id: 'f3', name: 'Standard Guild Factory', phone: '01912003344', waGroupLink: 'https://chat.whatsapp.com/sample-standard-guild', fabricQuality: 3, stockStatus: 'Low Stock', baseWholesaleCost: 32000, notes: 'Budget commercial grade furniture.' }
        ];

        const sampleCollagePresets = [
          { name: 'Royal Velvet Sofa', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%234338ca" rx="16"/><text x="50%" y="45%" fill="white" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">Royal Velvet Sofa</text><text x="50%" y="60%" fill="%23cbd5e1" font-family="sans-serif" font-size="14" text-anchor="middle">Navy Blue Fabric</text></svg>' },
          { name: 'Modern Leatherette', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%230f766e" rx="16"/><text x="50%" y="45%" fill="white" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">Modern Leatherette</text><text x="50%" y="60%" fill="%23cbd5e1" font-family="sans-serif" font-size="14" text-anchor="middle">Tan Leather Finish</text></svg>' },
          { name: 'Minimalist Dining', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23b45309" rx="16"/><text x="50%" y="45%" fill="white" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">Minimalist Dining</text><text x="50%" y="60%" fill="%23cbd5e1" font-family="sans-serif" font-size="14" text-anchor="middle">Teak Wood Grain</text></svg>' },
          { name: 'Chesterfield Armchair', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23be123c" rx="16"/><text x="50%" y="45%" fill="white" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">Chesterfield Armchair</text><text x="50%" y="60%" fill="%23cbd5e1" font-family="sans-serif" font-size="14" text-anchor="middle">Tufted Emerald Upholstery</text></svg>' }
        ];

        // --- SEEDING 13 BOOTSTRAP REAL-WORLD ORDERS ---
        const defaultOrders = [
          { id: 'ORD-1001', timestamp: '2026-08-01 10:15', merchantId: 'u2', merchantName: 'Tanvir Hossain', customerName: 'Far Ha Na', customerPhone: '01711223344', customerAddress: 'Apt 4B, Green Road, Dhanmondi, Dhaka', trafficSource: 'Messenger', productCategory: 'L-Shape Sofa', seatConfig: 'L-Shape', fulfillmentMethod: 'Home Delivery', saleAmount: 65000, deliveryCharge: 2500, totalAmount: 67500, status: 'Delivered', urgent: false, notes: 'Navy blue velvet fabric.', cnNumber: '276331879', invoiceNumber: 'INV-1001', collagePhotoFileName: 'collages/seller1_CN-1001_INV-1001_2026-08-01.jpg' },
          { id: 'ORD-1002', timestamp: '2026-08-02 11:30', merchantId: 'u2', merchantName: 'Tanvir Hossain', customerName: 'Muslim Wddin Piyash', customerPhone: '01819876543', customerAddress: 'House 12, Road 4, Sector 7, Uttara, Dhaka', trafficSource: 'WhatsApp', productCategory: 'Sofa Set', seatConfig: '3-Seater', fulfillmentMethod: 'Home Delivery', saleAmount: 48000, deliveryCharge: 2000, totalAmount: 50000, status: 'Courier Booking', urgent: true, notes: 'Requested delivery before weekend.', cnNumber: '278097551', invoiceNumber: 'INV-1002', collagePhotoFileName: 'collages/seller1_CN-1002_INV-1002_2026-08-02.jpg' },
          { id: 'ORD-1003', timestamp: '2026-08-03 14:20', merchantId: 'u3', merchantName: 'Ariful Ahmed', customerName: 'Rayhan Kabir', customerPhone: '01912345678', customerAddress: 'GEC Circle, Nasirabad, Chattogram', trafficSource: 'Direct Call', productCategory: 'Recliner Chair', seatConfig: '1-Seater', fulfillmentMethod: 'Courier Service', saleAmount: 28000, deliveryCharge: 1500, totalAmount: 29500, status: 'Courier Pending', urgent: false, notes: 'Tagged via Sundarban Courier.', cnNumber: '279816167', invoiceNumber: 'INV-1003', collagePhotoFileName: 'collages/seller2_CN-1003_INV-1003_2026-08-03.jpg' },
          { id: 'ORD-1004', timestamp: '2026-08-04 09:45', merchantId: 'u4', merchantName: 'Farah Naz', customerName: 'Anisur Rahman', customerPhone: '01715556677', customerAddress: 'Zindabazar, Sylhet Sadar, Sylhet', trafficSource: 'Walk-in', productCategory: 'Dining Table', seatConfig: 'Custom Set', fulfillmentMethod: 'Courier Service', saleAmount: 85000, deliveryCharge: 3500, totalAmount: 88500, status: 'Factory Submit', urgent: false, notes: '6-seater in Teak wood finish.', cnNumber: '279818987', invoiceNumber: 'INV-1004', collagePhotoFileName: 'collages/seller3_CN-1004_INV-1004_2026-08-04.jpg' },
          { id: 'ORD-1005', timestamp: '2026-08-05 16:10', merchantId: 'u2', merchantName: 'Tanvir Hossain', customerName: 'Tahmina Begum', customerPhone: '01611224455', customerAddress: 'Block C, Bashundhara R/A, Dhaka', trafficSource: 'Messenger', productCategory: 'L-Shape Sofa', seatConfig: 'L-Shape', fulfillmentMethod: 'Home Delivery', saleAmount: 72000, deliveryCharge: 3000, totalAmount: 75000, status: 'Confirmation Call', urgent: true, notes: 'Verify color swatch.', cnNumber: '281926578', invoiceNumber: 'INV-1005', collagePhotoFileName: 'collages/seller1_CN-1005_INV-1005_2026-08-05.jpg' },
          { id: 'ORD-1006', timestamp: '2026-08-06 13:05', merchantId: 'u3', merchantName: 'Ariful Ahmed', customerName: 'Kazi Shakil', customerPhone: '01812334455', customerAddress: 'College Road, Mymensingh Sadar', trafficSource: 'WhatsApp', productCategory: 'Sofa Set', seatConfig: '2-Seater', fulfillmentMethod: 'Courier Service', saleAmount: 36000, deliveryCharge: 1800, totalAmount: 37800, status: 'Delivered', urgent: false, notes: 'Full payment cleared.', cnNumber: '281927672', invoiceNumber: 'INV-1006', collagePhotoFileName: 'collages/seller2_CN-1006_INV-1006_2026-08-06.jpg' },
          { id: 'ORD-1007', timestamp: '2026-08-07 10:50', merchantId: 'u4', merchantName: 'Farah Naz', customerName: 'Nusrat Jahan', customerPhone: '01799887766', customerAddress: 'Chashara, Narayanganj', trafficSource: 'Messenger', productCategory: 'Custom Bed', seatConfig: 'Custom Set', fulfillmentMethod: 'Home Delivery', saleAmount: 95000, deliveryCharge: 2500, totalAmount: 97500, status: 'Partial Delivered', urgent: false, notes: 'Frame delivered, mattress pending.', cnNumber: '282095540', invoiceNumber: 'INV-1007', collagePhotoFileName: 'collages/seller3_CN-1007_INV-1007_2026-08-07.jpg' },
          { id: 'ORD-1008', timestamp: '2026-08-08 15:30', merchantId: 'u2', merchantName: 'Tanvir Hossain', customerName: 'Mahfuzur Rahman', customerPhone: '01552345678', customerAddress: 'Main Road, Rajshahi Sadar', trafficSource: 'Direct Call', productCategory: 'Recliner Chair', seatConfig: '1-Seater', fulfillmentMethod: 'Courier Service', saleAmount: 30000, deliveryCharge: 1500, totalAmount: 31500, status: 'Returned from Customer', urgent: true, notes: 'Color mismatch claim.', cnNumber: '282403020', invoiceNumber: 'INV-1008', collagePhotoFileName: 'collages/seller1_CN-1008_INV-1008_2026-08-08.jpg' },
          { id: 'ORD-1009', timestamp: '2026-08-09 11:15', merchantId: 'u3', merchantName: 'Ariful Ahmed', customerName: 'Sultana Razia', customerPhone: '01733445566', customerAddress: 'Shibbari More, Khulna', trafficSource: 'WhatsApp', productCategory: 'Sofa Set', seatConfig: '3-Seater', fulfillmentMethod: 'Courier Service', saleAmount: 52000, deliveryCharge: 2200, totalAmount: 54200, status: 'Returned Received', urgent: false, notes: 'Returned to warehouse.', cnNumber: '282531127', invoiceNumber: 'INV-1009', collagePhotoFileName: 'collages/seller2_CN-1009_INV-1009_2026-08-09.jpg' }
];

        const defaultCategories = ['L-Shape Sofa', 'Sofa Set', 'Recliner Chair', 'Dining Table', 'Custom Bed', 'Living Room Accessories'];

        // --- STATE MANAGEMENT ---
        const users = ref([]);
        const orders = ref([]);
        const orderLogs = ref([]);
        const deletedOrders = ref([]);
        const selectedOrders = ref(new Set());
        const categories = ref([]);
        const factories = ref([]);
        const factoryBills = ref([]);
        const appsScriptUrl = ref('https://script.google.com/macros/s/AKfycbzfm2zfRIZpmRHfwfCa6G3JgCWk2dH6GEP_bXozSggC70jUjNKqG1gJEkDhw9zLkbd8xw/exec');
        const isBackingUp = ref(false);
        const isTestingSync = ref(false);
        const syncStatusMsg = ref('');
        const syncStatusColor = ref('');
        const currentUser = ref(null);

        // --- DARK MODE LOGIC ---
        const isDarkMode = ref(false);

        const applyDarkMode = () => {
          if (isDarkMode.value) {
            document.body.classList.add('dark');
            document.documentElement.classList.add('dark');
          } else {
            document.body.classList.remove('dark');
            document.documentElement.classList.remove('dark');
          }
        };

        const toggleDarkMode = () => {
          isDarkMode.value = !isDarkMode.value;
          localforage.setItem('homeaura_dark', isDarkMode.value ? 'true' : 'false');
          applyDarkMode();
        };

        const openInspectModal = (order) => {
          modalData.title = `Full Order & Attachments: ${order.id}`;
          modalData.order = reactive({ ...order });
          activeModal.value = 'inspectModal';
        };

        // --- MEDIA TILE SELECTION & CTRL+V PASTE LISTENER ---
        const selectedProofTile = ref(''); 
        const selectedCollageTile = ref(''); 

        const selectProofTile = (tileKey) => {
          selectedProofTile.value = tileKey;
          selectedCollageTile.value = '';
        };

        const selectCollageTile = (tileKey) => {
          selectedCollageTile.value = tileKey;
          selectedProofTile.value = '';
        };

        const activeTab = ref('dashboard');
        const loginForm = reactive({ username: '', password: '' });
        const loginError = ref('');

        // Filtering
        const orderSearch = ref('');
        const sortOption = ref('NEWEST');
        const statusFilter = ref('ALL');
        const merchantFilter = ref('ALL');
        const factoryFilter = ref('ALL');
        const urgentOnly = ref(false);

        // Category Creation
        const newCategoryName = ref('');

        // Intake Form
        const clipboardRawText = ref('');
        const parseSuccessMsg = ref('');
        const intakeForm = reactive({
          customerName: '',
          customerPhone: '',
          customerAddress: '',
          trafficSource: 'Messenger',
          productCategory: 'L-Shape Sofa',
          seatConfig: '3-Seater',
          fulfillmentMethod: 'Home Delivery',
          saleAmount: 0,
          deliveryCharge: 0,
          urgent: false,
          notes: '',
          cnNumber: '',
          invoiceNumber: '',
          collagePhotoUrl: '',
          collagePhotoFileName: '',
          socialProofUrl: '',
          socialProofFileName: '',
          extraDetails: '',
          factoryTag: ''
        });

        // Modals
        const activeModal = ref(null);
        const modalData = reactive({ title: '', order: null, user: null, factory: null, selectedFactoryId: null, newStatus: '', url: '' });
        
        // Tracking State
        const trackingData = ref(null);
        const isLoadingTracking = ref(false);



        const fileToBase64 = (file) => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });

        const uploadFileToServer = async (file, type, fileName) => {
          if (appsScriptUrl.value) {
            try {
              const base64Full = await fileToBase64(file);
              const base64Data = base64Full.split(',')[1];
              
              const payload = {
                action: 'uploadImage',
                fileName: fileName,
                mimeType: file.type,
                base64: base64Data
              };
              
              const response = await fetch(appsScriptUrl.value, {
                redirect: 'follow',
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload)
              });
              const data = await response.json();
              if (data.status === 'success' && data.url) {
                return data.url;
              }
            } catch (err) {
              console.error('GAS Upload failed', err);
            }
          }

          return null;
        };

        // --- HOST DISK MEDIA UTILITIES (photos/, collages/, screenshots/) ---
        const saveMediaToHostDisk = (url, relativePath) => {
          if (!url) return;
          const filename = (relativePath || 'media_attachment.png').split('/').pop();
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };

        const copyHostRelativePath = (relativePath) => {
          if (!relativePath) return;
          navigator.clipboard.writeText(relativePath);
          const folder = relativePath.split('/')[0] || 'host folder';
          alert(`📋 Copied local relative path: ${relativePath}\n\nThis file is designated for the "\${folder}/" directory next to index.html on your host computer.`);
        };

        // --- MEDIA STATS COMPUTED ---
        const mediaFolderStats = computed(() => {
          let photosCount = 0;
          let collagesCount = 0;
          let screenshotsCount = 0;

          const all = [...orders.value, ...deletedOrders.value];
          all.forEach(o => {
            if (o.collagePhotoUrl || o.collagePhotoFileName) collagesCount++;
            if (o.socialProofUrl || o.socialProofFileName) screenshotsCount++;
          });

          factoryBills.value.forEach(b => {
            if (b.socialProofUrl || b.socialProofFileName) photosCount++;
          });

          return { photosCount, collagesCount, screenshotsCount, total: photosCount + collagesCount + screenshotsCount };
        });

        // --- BATCH MEDIA ARCHIVER (ZIP) ---
        const isPackagingZip = ref(false);
        const packageAndDownloadAllMediaZip = async () => {
          if (typeof JSZip === 'undefined') {
            alert('ZIP creation engine loading, please try again in a moment.');
            return;
          }
          isPackagingZip.value = true;
          try {
            const zip = new JSZip();
            const photosFolder = zip.folder("photos");
            const collagesFolder = zip.folder("collages");
            const screenshotsFolder = zip.folder("screenshots");

            zip.file("create_host_folders.bat", `@echo off\r\necho Creating HomeAura Host Folders by index.html...\r\nif not exist "photos" mkdir photos\r\nif not exist "collages" mkdir collages\r\nif not exist "screenshots" mkdir screenshots\r\necho Successfully created ./photos, ./collages, and ./screenshots\r\npause`);
            zip.file("create_host_folders.sh", `#!/bin/bash\nmkdir -p photos collages screenshots\necho "HomeAura folders created beside index.html!"\n`);
            zip.file("README_HOST_FOLDERS.txt", 
`HomeAura Host Computer Folder Structure
========================================
Keep these 3 folders in the same directory alongside index.html:

1. ./photos/       -> General item photos, factory bill receipts, fabric details
2. ./collages/     -> Product design collages
3. ./screenshots/  -> Social media chat screenshots & payment proofs

When opening index.html on your computer, all media will be resolved from these local folders.`
            );

            const allOrdersList = [...orders.value, ...deletedOrders.value];
            const fetchToBlob = async (url) => {
              if (!url) return null;
              try {
                const res = await fetch(url);
                return await res.blob();
              } catch(e) {
                return null;
              }
            };

            for (const ord of allOrdersList) {
              if (ord.collagePhotoUrl) {
                const fname = (ord.collagePhotoFileName || `collage_${ord.id}.jpg`).split('/').pop();
                const b = await fetchToBlob(ord.collagePhotoUrl);
                if (b) collagesFolder.file(fname, b);
              }
              if (ord.socialProofUrl) {
                const fname = (ord.socialProofFileName || `proof_${ord.id}.png`).split('/').pop();
                const b = await fetchToBlob(ord.socialProofUrl);
                if (b) screenshotsFolder.file(fname, b);
              }
            }

            for (const bill of factoryBills.value) {
              if (bill.socialProofUrl) {
                const fname = (bill.socialProofFileName || `bill_${bill.id}.jpg`).split('/').pop();
                const b = await fetchToBlob(bill.socialProofUrl);
                if (b) photosFolder.file(fname, b);
              }
            }

            const content = await zip.generateAsync({ type: "blob" });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = `HomeAura_Media_Folders_${new Date().toISOString().slice(0,10)}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            alert('✅ All media categorized into separate folders (photos/, collages/, screenshots/) and downloaded as a ZIP archive!');
          } catch(err) {
            console.error('ZIP export error:', err);
            alert('Error generating media zip: ' + err.message);
          } finally {
            isPackagingZip.value = false;
          }
        };

        const downloadHostFolderSetupScript = () => {
          const batContent = `@echo off\r\necho Setting up HomeAura Host Folders next to index.html...\r\nif not exist "photos" mkdir photos\r\nif not exist "collages" mkdir collages\r\nif not exist "screenshots" mkdir screenshots\r\necho Folders ready:\r\necho   - photos\\\r\necho   - collages\\\r\necho   - screenshots\\\r\npause`;
          const blob = new Blob([batContent], { type: 'text/plain' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'setup_homeaura_folders.bat';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };

        // --- COLLAGE FILE ATTACHMENT & NAMING ENGINE ---
        // Format: sellerUsername_cnNumber_invoiceNumber_date.ext
        const processCollageFile = async (file, targetObj = intakeForm) => {
          if (!file || !file.type.startsWith('image/')) return;
          const sellerUsername = currentUser.value ? currentUser.value.username : 'seller';
          const rawCn = targetObj.cnNumber || 'NOCN';
          const rawInv = targetObj.invoiceNumber || 'NOINV';
          const cleanCn = rawCn.replace(/[^a-zA-Z0-9-]/g, '');
          const cleanInv = rawInv.replace(/[^a-zA-Z0-9-]/g, '');
          const dateStr = targetObj.timestamp ? targetObj.timestamp.slice(0, 10) : new Date().toISOString().slice(0, 10);
          const ext = (file.name ? file.name.split('.').pop() : 'jpg').toLowerCase();

          const fileName = `${sellerUsername}_${cleanCn}_${cleanInv}_${dateStr}.${ext}`;
          const relativePath = `collages/${fileName}`;

          targetObj.collagePhotoFileName = relativePath;
          if (targetObj === intakeForm) {
            parseSuccessMsg.value = '🖼️ Collage photo attached & queued for background sync!';
            setTimeout(() => { parseSuccessMsg.value = ''; }, 4000);
          }
          
          targetObj.collagePhotoUrl = await queueImageUpload(file, fileName, 'collages');
        };

        const handleCollageFileUpload = (event, targetObj = intakeForm) => {
          const file = event.target.files && event.target.files[0];
          if (file) processCollageFile(file, targetObj);
        };

        const handleCollagePaste = (event, targetObj = intakeForm) => {
          const clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
          if (!clipboardData || !clipboardData.items) return;
          const items = clipboardData.items;
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
              const blob = items[i].getAsFile();
              if (blob) {
                processCollageFile(blob, targetObj);
                event.preventDefault();
                break;
              }
            }
          }
        };

        const handleCollageDrop = (event, targetObj = intakeForm) => {
          event.preventDefault();
          if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
            processCollageFile(event.dataTransfer.files[0], targetObj);
          }
        };

        // --- SOCIAL MEDIA CHAT PROOF SCREENSHOT ENGINE ---
        // Supports clipboard paste (Ctrl+V), drag-and-drop, and file upload
        const processProofFile = async (file, targetObj = intakeForm) => {
          if (!file || !file.type.startsWith('image/')) return;
          const sellerUsername = currentUser.value ? currentUser.value.username : 'seller';
          const rawCn = targetObj.cnNumber || 'NOCN';
          const cleanCn = rawCn.replace(/[^a-zA-Z0-9-]/g, '');
          const dateStr = targetObj.timestamp ? targetObj.timestamp.slice(0, 10) : new Date().toISOString().slice(0, 10);
          const ext = (file.name ? file.name.split('.').pop() : 'png').toLowerCase();

          const fileName = `proof_${sellerUsername}_${cleanCn}_${dateStr}.${ext}`;
          const relativePath = `screenshots/${fileName}`;

          targetObj.socialProofFileName = relativePath;
          if (targetObj === intakeForm) {
            parseSuccessMsg.value = '📸 Social media order proof screenshot attached & queued for background sync!';
            setTimeout(() => { parseSuccessMsg.value = ''; }, 4000);
          }
          
          targetObj.socialProofUrl = await queueImageUpload(file, fileName, 'screenshots');
        };

        const handleProofFileUpload = (event, targetObj = intakeForm) => {
          const file = event.target.files && event.target.files[0];
          if (file) processProofFile(file, targetObj);
        };

        const handleProofPaste = (event, targetObj = intakeForm) => {
          const clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
          if (!clipboardData || !clipboardData.items) return;
          const items = clipboardData.items;
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
              const blob = items[i].getAsFile();
              if (blob) {
                processProofFile(blob, targetObj);
                event.preventDefault();
                break;
              }
            }
          }
        };

        const handleProofDrop = (event, targetObj = intakeForm) => {
          event.preventDefault();
          if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
            processProofFile(event.dataTransfer.files[0], targetObj);
          }
        };

        // --- SELLER ONE-WAY STATUS ALLOWED PIPELINE ---
        const getAllowedStatusesForUser = (currentStatus) => {
          if (!currentUser.value) return pipelineStages;
          if (currentUser.value.role === 'admin') return pipelineStages;
          
          const currIdx = pipelineStages.indexOf(currentStatus);
          if (currIdx === -1) return pipelineStages;
          return pipelineStages.slice(currIdx);
        };

        const advanceSellerStatus = (order) => {
          const currIdx = pipelineStages.indexOf(order.status);
          if (currIdx !== -1 && currIdx < pipelineStages.length - 1) {
            order.status = pipelineStages[currIdx + 1];
            logOrderEvent(order.id, 'Status Changed', 'Advanced to ' + order.status);
            saveOrders();
          }
        };

        // --- SOCKET.IO REALTIME ENGINE WITH LOCALSTORAGE FALLBACK ---
        
        
        const loadInitialData = async () => {
            const dark = await localforage.getItem('homeaura_dark');
            isDarkMode.value = dark === 'true';
            applyDarkMode();

            const scriptUrl = await localforage.getItem('homeaura_apps_script_url');
            if (scriptUrl) appsScriptUrl.value = scriptUrl;

            const storedUsers = await localforage.getItem('homeaura_users');
            users.value = storedUsers ? JSON.parse(storedUsers) : defaultUsers;

            const storedOrders = await localforage.getItem('homeaura_orders');
            orders.value = storedOrders ? JSON.parse(storedOrders) : defaultOrders;

            const storedDeletedOrders = await localforage.getItem('homeaura_deleted_orders');
            deletedOrders.value = storedDeletedOrders ? JSON.parse(storedDeletedOrders) : [];

            const storedCats = await localforage.getItem('homeaura_categories');
            categories.value = storedCats ? JSON.parse(storedCats) : defaultCategories;

            const storedFactories = await localforage.getItem('homeaura_factories');
            factories.value = storedFactories ? JSON.parse(storedFactories) : defaultFactories;

            const storedFactoryBills = await localforage.getItem('homeaura_factory_bills');
            factoryBills.value = storedFactoryBills ? JSON.parse(storedFactoryBills) : [];

            // Recover session
            const storedSession = await localforage.getItem('homeaura_session');
            if (storedSession) {
              try {
                const user = JSON.parse(storedSession);
                if (user && user.username) {
                  const freshUser = users.value.find(u => u.username === user.username);
                  if (freshUser && freshUser.active) {
                    currentUser.value = freshUser;
                    activeTab.value = freshUser.role === 'admin' ? 'dashboard' : 'intake';
                  } else {
                    localforage.removeItem('homeaura_session');
                  }
                } else {
                  localforage.removeItem('homeaura_session');
                }
              } catch (e) {
                localforage.removeItem('homeaura_session');
              }
            }
        };

        const saveOrders = () => {
          localforage.setItem('homeaura_orders', JSON.stringify(orders.value));
        };
        const saveOrderLogs = () => {
          localforage.setItem('homeaura_orderLogs', JSON.stringify(orderLogs.value));
        };

        const logOrderEvent = (orderId, action, details = '') => {
          const user = currentUser.value ? currentUser.value.username : 'System';
          const now = new Date();
          const timestamp = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0') + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
          orderLogs.value.push({
            id: 'LOG-' + Date.now() + '-' + Math.floor(Math.random()*1000),
            orderId,
            timestamp,
            user,
            action,
            details
          });
          saveOrderLogs();
        };

        const saveDeletedOrders = () => {
          localforage.setItem('homeaura_deleted_orders', JSON.stringify(deletedOrders.value));
        };
        const saveUsers = () => {
          localforage.setItem('homeaura_users', JSON.stringify(users.value));
        };
        const saveCategories = () => {
          localforage.setItem('homeaura_categories', JSON.stringify(categories.value));
        };
        const saveFactoryBills = () => {
          localforage.setItem('homeaura_factory_bills', JSON.stringify(factoryBills.value));
        };
        const saveFactories = () => {
          localforage.setItem('homeaura_factories', JSON.stringify(factories.value));
        };

        const saveDataLocally = () => {
          saveOrders();
          saveOrderLogs();
          saveDeletedOrders();
          saveUsers();
          saveCategories();
          saveFactoryBills();
          saveFactories();
        };

        // --- DYNAMIC FACTORY PRIORITY ENGINE ---
        const rankedFactories = computed(() => {
          return factories.value.map(f => {
            // Count pending orders assigned to this factory tag OR in workflow pending stages
            const pendingCount = orders.value.filter(o => {
              const isThisFactory = o.factoryTag === f.name;
              const isPending = o.status !== 'Delivered' && o.status !== 'Returned Received';
              return isThisFactory && isPending;
            }).length;

            let stockScore = 30;
            if (f.stockStatus === 'Low Stock') stockScore = 15;
            if (f.stockStatus === 'Out of Stock') stockScore = -50;

            const qualityScore = (f.fabricQuality || 3) * 25;
            const priceFactor = Math.round((f.baseWholesaleCost || 35000) / 1000);
            const loadPenalty = pendingCount * 12; // More pending orders = drop down in priority

            const totalScore = qualityScore + stockScore - priceFactor - loadPenalty;

                        return {
              ...f,
              pendingCount,
              totalScore
            };
          }).sort((a, b) => b.totalScore - a.totalScore);
        });

        // --- CURRENCY LOCALIZATION (en-BD / BDT) ---
        const formatBDT = (amount) => {
          const val = Number(amount) || 0;
          return '৳' + val.toLocaleString('en-BD');
        };

        // --- AUTHENTICATION ---
        const handleLogin = () => {
          loginError.value = '';
          const user = users.value.find(u => u.username === loginForm.username && u.password === loginForm.password);
          if (!user) {
            loginError.value = 'Invalid username or password.';
            return;
          }
          if (!user.active) {
            loginError.value = 'Account is suspended. Contact Administrator.';
            return;
          }
          currentUser.value = user;
          localforage.setItem('homeaura_session', JSON.stringify(user));
          activeTab.value = user.role === 'admin' ? 'dashboard' : 'intake';
          loginForm.username = '';
          loginForm.password = '';
        };

        const handleLogout = () => {
          currentUser.value = null;
          localforage.removeItem('homeaura_session');
        };

        // --- COMPUTED METRICS ---
        const metrics = computed(() => {
          const grossRevenue = orders.value.reduce((acc, o) => acc + (o.totalAmount || 0), 0);
          const deliveredProductsRevenue = orders.value.filter(o => o.status === 'Delivered' || o.status === 'Partial Delivered').reduce((acc, o) => acc + (o.saleAmount || 0), 0);
          const deliveredCount = orders.value.filter(o => o.status === 'Delivered').length;
          const pendingCount = orders.value.filter(o => o.status !== 'Delivered' && o.status !== 'Returned Received').length;
          const urgentCount = orders.value.filter(o => o.urgent).length;
          return { grossRevenue, deliveredProductsRevenue, deliveredCount, pendingCount, urgentCount };
        });

        const sellersList = computed(() => users.value.filter(u => u.role === 'seller'));
        const dispatchDeskOrders = computed(() => {
          return orders.value.filter(o => o.status !== 'Delivered' && o.status !== 'Returned Received').sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
        });

        const merchantStats = computed(() => {
          return sellersList.value.map(seller => {
            const sellerOrders = orders.value.filter(o => o.merchantName === seller.name || o.merchantId === seller.id);
            const totalSales = sellerOrders.reduce((acc, o) => acc + (o.saleAmount || 0), 0);
            const target = seller.target || 300000;
            const percentage = target > 0 ? Math.round((totalSales / target) * 100) : 0;
            return {
              username: seller.username,
              name: seller.name,
              totalOrders: sellerOrders.length,
              totalSales,
              target,
              percentage
            };
          });
        });

        const myOrders = computed(() => {
          if (!currentUser.value) return [];
          return orders.value.filter(o => o.merchantName === currentUser.value.name || o.merchantId === currentUser.value.id);
        });

        const myOrdersCount = computed(() => myOrders.value.length);

        const myMonthlySales = computed(() => {
          return myOrders.value.reduce((acc, o) => acc + (o.saleAmount || 0), 0);
        });

        const myTargetPercentage = computed(() => {
          const target = currentUser.value?.target || 300000;
          return target > 0 ? Math.round((myMonthlySales.value / target) * 100) : 0;
        });

        const filteredOrders = computed(() => {
          let result = orders.value.filter(o => {
            if (statusFilter.value !== 'ALL' && o.status !== statusFilter.value) return false;
            if (merchantFilter.value !== 'ALL' && o.merchantName !== merchantFilter.value) return false;
            if (factoryFilter.value !== 'ALL' && (o.factoryTag || '') !== factoryFilter.value) return false;
            if (urgentOnly.value && !o.urgent) return false;
            if (orderSearch.value) {
              const q = orderSearch.value.toLowerCase();
              return (
                o.id.toLowerCase().includes(q) ||
                o.customerName.toLowerCase().includes(q) ||
                o.customerPhone.includes(q) ||
                o.productCategory.toLowerCase().includes(q)
              );
            }
            return true;
          });

          if (sortOption.value === 'NEWEST') {
            result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          } else if (sortOption.value === 'OLDEST') {
            result.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
          } else if (sortOption.value === 'FACTORY') {
            result.sort((a, b) => {
              const fA = a.factoryTag || 'Z_Unassigned';
              const fB = b.factoryTag || 'Z_Unassigned';
              return fA.localeCompare(fB);
            });
          }

          return result;
        });

        // --- OMNI-CLIPBOARD HEURISTIC PARSER ENGINE ---
        const parseClipboard = () => {
          if (!clipboardRawText.value) return;
          const text = clipboardRawText.value;
          let parsedCount = 0;

          // Normalize Bengali numbers to English
          const bn2en = { '০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'7','৮':'8','৯':'9' };
          const normalizedText = text.replace(/[০-৯]/g, m => bn2en[m]);

          // 1. Phone extraction
          const phoneMatch = normalizedText.match(/(?:\+?88)?01[3-9]\d{8}/) || normalizedText.match(/01[3-9]\d{2}[-\s]?\d{6}/);
          if (phoneMatch) {
            intakeForm.customerPhone = phoneMatch[0].replace(/[-\s]/g, '');
            parsedCount++;
          }

          // 2. Traffic Source extraction
          if (/messenger|fb|facebook/i.test(text)) {
            intakeForm.trafficSource = 'Messenger';
            parsedCount++;
          } else if (/whatsapp|wa/i.test(text)) {
            intakeForm.trafficSource = 'WhatsApp';
            parsedCount++;
          } else if (/call|phone|direct/i.test(text)) {
            intakeForm.trafficSource = 'Direct Call';
            parsedCount++;
          }

          // 3. Name heuristic (English or Bengali)
          const nameMatch = text.match(/(?:নাম[ঃ:]?|name|customer|client)[:\s=]+([^\n]+)/i);
          if (nameMatch) {
            intakeForm.customerName = nameMatch[1].trim();
            parsedCount++;
          }

          // 4. Address heuristic (English or Bengali)
          const addrMatch = text.match(/(?:ঠিকানা|address|location)[:\s=]+([^\n]+)/i);
          if (addrMatch) {
            intakeForm.customerAddress = addrMatch[1].trim();
            parsedCount++;
          }

          // 5. Price extraction
          const priceMatch = normalizedText.match(/(?:প্রাইস|মূল্য|price|sale|cost)[:\s=]*([\d,]+)/i) || normalizedText.match(/(\d{4,6})\s*tk/i);
          if (priceMatch) {
            intakeForm.saleAmount = parseInt(priceMatch[1].replace(/,/g, ''), 10);
            parsedCount++;
          }

          // 6. Delivery Charge extraction
          const delMatch = normalizedText.match(/(?:ডেলিভারি(?: চার্জ)?|del|delivery(?: charge)?|charge)[:\s=]*([\d,]+)/i);
          if (delMatch) {
            intakeForm.deliveryCharge = parseInt(delMatch[1].replace(/,/g, ''), 10);
            parsedCount++;
          }

          // 7. Extra details extraction (Sofa Config, Color, etc.)
          let extra = [];
          const sofaMatch = text.match(/(?:সোফা|sofa|seat)[:\s=]+([^\n]+)/i);
          if (sofaMatch) {
            extra.push(`Sofa: ${sofaMatch[1].trim()}`);
            intakeForm.seatConfig = 'Custom Set'; 
            parsedCount++;
          }
          const colorMatch = text.match(/(?:কালার|color|colour)[:\s=]+([^\n]+)/i);
          if (colorMatch) {
            extra.push(`Color: ${colorMatch[1].trim()}`);
            parsedCount++;
          }
          if (extra.length > 0) {
            intakeForm.extraDetails = (intakeForm.extraDetails ? intakeForm.extraDetails + '\n' : '') + extra.join('\n');
          }

          // 8. Courier detection (e.g. SFC)
          if (/sfc|stead\s*fast/i.test(text)) {
            intakeForm.fulfillmentMethod = 'Courier Service';
            intakeForm.notes = (intakeForm.notes ? intakeForm.notes + '\n' : '') + 'SFC (Stead Fast Courier)';
            parsedCount++;
          }

          // 9. Seat configuration extraction (fallback English)
          if (/1-seater|1 seater/i.test(text)) { intakeForm.seatConfig = '1-Seater'; parsedCount++; }
          else if (/2-seater|2 seater/i.test(text)) { intakeForm.seatConfig = '2-Seater'; parsedCount++; }
          else if (/3-seater|3 seater/i.test(text)) { intakeForm.seatConfig = '3-Seater'; parsedCount++; }
          else if (/l-shape|l shape/i.test(text)) { intakeForm.seatConfig = 'L-Shape'; parsedCount++; }

          // 10. Fallback Price extraction (looks for ৳, tk, bdt, etc.)
          const fbPriceMatch = text.match(/(?:tk|bdt|৳|amount)[:\s=]+([\d,]+)/i);
          if (fbPriceMatch && !priceMatch) {
            intakeForm.saleAmount = parseInt(fbPriceMatch[1].replace(/,/g, ''), 10);
            parsedCount++;
          }

          // 11. CN Number extraction
          const cnMatch = text.match(/(?:cn|consignment|courier id)[:\s=]*([A-Za-z0-9-]+)/i);
          if (cnMatch) {
            intakeForm.cnNumber = cnMatch[1].toUpperCase();
            parsedCount++;
          }

          // 12. Factory Invoice extraction
          const invMatch = text.match(/(?:inv|invoice|bill)[:\s=]*([A-Za-z0-9-]+)/i);
          if (invMatch) {
            intakeForm.invoiceNumber = invMatch[1].toUpperCase();
            parsedCount++;
          }

          parseSuccessMsg.value = `✨ Parsed ${parsedCount} fields automatically from pasted message!`;
          setTimeout(() => { parseSuccessMsg.value = ''; }, 4000);
        };

        // --- ORDER SUBMISSION ---
        const submitNewOrder = () => {
          const newId = 'ORD-' + (1000 + orders.value.length + 1);
          const now = new Date();
          const timestamp = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0') + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

          const sellerUsername = currentUser.value ? currentUser.value.username : 'seller';
          const autoCn = intakeForm.cnNumber || ('CN-' + (1000 + orders.value.length + 1));
          const autoInv = intakeForm.invoiceNumber || ('INV-' + (1000 + orders.value.length + 1));
          const dateStr = timestamp.slice(0, 10);
          const autoFileName = intakeForm.collagePhotoFileName || `collages/${sellerUsername}_${autoCn.replace(/[^a-zA-Z0-9-]/g, '')}_${autoInv.replace(/[^a-zA-Z0-9-]/g, '')}_${dateStr}.jpg`;

          const newOrder = {
            id: newId,
            timestamp,
            merchantId: currentUser.value.id,
            merchantName: currentUser.value.name,
            customerName: intakeForm.customerName,
            customerPhone: intakeForm.customerPhone,
            customerAddress: intakeForm.customerAddress,
            trafficSource: intakeForm.trafficSource,
            productCategory: intakeForm.productCategory,
            seatConfig: intakeForm.seatConfig,
            fulfillmentMethod: intakeForm.fulfillmentMethod,
            saleAmount: intakeForm.saleAmount || 0,
            deliveryCharge: intakeForm.deliveryCharge || 0,
            totalAmount: (intakeForm.saleAmount || 0) + (intakeForm.deliveryCharge || 0),
            status: 'Confirmation Call',
            urgent: intakeForm.urgent,
            notes: intakeForm.notes,
            cnNumber: autoCn,
            invoiceNumber: autoInv,
            collagePhotoUrl: intakeForm.collagePhotoUrl || '',
            collagePhotoFileName: autoFileName,
            socialProofUrl: intakeForm.socialProofUrl || '',
            socialProofFileName: intakeForm.socialProofFileName || '',
            extraDetails: intakeForm.extraDetails || '',
            factoryTag: intakeForm.factoryTag || ''
          };

          orders.value.unshift(newOrder);
          logOrderEvent(newOrder.id, 'Order Created', 'Initial intake via form');
          saveOrders();

          // Reset Form
          intakeForm.customerName = '';
          intakeForm.customerPhone = '';
          intakeForm.customerAddress = '';
          intakeForm.saleAmount = 0;
          intakeForm.deliveryCharge = 0;
          intakeForm.urgent = false;
          intakeForm.notes = '';
          intakeForm.cnNumber = '';
          intakeForm.invoiceNumber = '';
          intakeForm.collagePhotoUrl = '';
          intakeForm.collagePhotoFileName = '';
          intakeForm.socialProofUrl = '';
          intakeForm.socialProofFileName = '';
          intakeForm.extraDetails = '';
          intakeForm.factoryTag = '';
          clipboardRawText.value = '';

          activeTab.value = 'my_orders';
        };

        const quickStatusChange = (order, newStatus) => {
          if (currentUser.value?.role === 'seller' && order.merchantName !== currentUser.value?.name && order.merchantId !== currentUser.value?.id) {
            alert("⚠️ Security restriction: You cannot update status of orders assigned to other merchants.");
            return;
          }
          order.status = newStatus;
          saveOrders();
        };

        const toggleUrgent = (order) => {
          if (currentUser.value?.role === 'seller' && order.merchantName !== currentUser.value?.name && order.merchantId !== currentUser.value?.id) {
            alert("⚠️ Security restriction: You cannot update orders assigned to other merchants.");
            return;
          }
          order.urgent = !order.urgent;
          saveOrders();
        };

        // --- FACTORY MANAGEMENT & DISPATCH METHODS ---
        
        const openAddBillModal = () => {
          modalData.title = 'Add Factory Bill & Payment';
          modalData.bill = reactive({ factoryId: '', amount: '', date: new Date().toISOString().substring(0,10), notes: '', linkedOrderIds: [], socialProofUrl: '' });
          selectedProofTile.value = 'modal';
          activeModal.value = 'factoryBillModal';
        };

        const openViewBillModal = (bill) => {
          modalData.title = 'View Factory Bill Details';
          modalData.bill = { ...bill };
          activeModal.value = 'viewBillModal';
        };

        const getLinkedOrderDetails = (id) => {
          return orders.value.find(o => o.id === id) || deletedOrders.value.find(o => o.id === id) || null;
        };

        const openEditBillModal = (bill) => {
          modalData.title = 'Edit Factory Bill & Linked Orders';
          modalData.bill = reactive({ ...bill, linkedOrderIds: bill.linkedOrderIds || [] });
          selectedProofTile.value = 'modal';
          activeModal.value = 'factoryBillModal';
        };

        const saveBillModal = () => {
          if (!modalData.bill.factoryId || !modalData.bill.amount) {
            alert('Factory and Amount are required.');
            return;
          }
          
          // Cleanup linked orders that don't belong to the newly selected factory
          const factoryName = getFactoryName(modalData.bill.factoryId);
          const allOrders = [...orders.value, ...deletedOrders.value];
          modalData.bill.linkedOrderIds = (modalData.bill.linkedOrderIds || []).filter(id => {
            const o = allOrders.find(ord => ord.id === id);
            return o && o.factoryTag === factoryName;
          });
          if (modalData.bill.id) {
            const idx = factoryBills.value.findIndex(b => b.id === modalData.bill.id);
            if (idx !== -1) {
              factoryBills.value[idx] = { ...modalData.bill };
            } else {
              factoryBills.value.push({ ...modalData.bill });
            }
          } else {
            modalData.bill.id = 'FB-' + Date.now().toString().slice(-6);
            factoryBills.value.push({ ...modalData.bill });
          }
          saveFactoryBills();
          closeModal();
        };

        const deleteBill = (id) => {
          if (confirm('Are you sure you want to delete this bill?')) {
            factoryBills.value = factoryBills.value.filter(b => b.id !== id);
            saveFactoryBills();
          }
        };

        const getFactoryName = (id) => {
          const f = factories.value.find(fac => fac.id === id);
          return f ? f.name : 'Unknown Factory';
        };

        const openAddFactoryModal = () => {
          modalData.title = 'Register New Manufacturing Partner';
          modalData.factory = reactive({
            id: 'f' + (factories.value.length + 1),
            name: '',
            phone: '',
            waGroupLink: '',
            fabricQuality: 4,
            stockStatus: 'In Stock',
            baseWholesaleCost: 35000,
            notes: ''
          });
          activeModal.value = 'factoryModal';
        };

        const openEditFactoryModal = (factory) => {
          modalData.title = `Edit Factory: ${factory.name}`;
          modalData.factory = reactive({ ...factory });
          activeModal.value = 'factoryModal';
        };

        const saveFactoryModal = () => {
          const idx = factories.value.findIndex(f => f.id === modalData.factory.id);
          if (idx !== -1) {
            factories.value[idx] = { ...modalData.factory };
          } else {
            factories.value.push({ ...modalData.factory });
          }
          saveFactories();
          closeModal();
        };

        // --- WHATSAPP DISPATCH METHODS ---
        const openDispatchModal = (order) => {
          modalData.title = `WhatsApp Factory Dispatch (Order ${order.id})`;
          modalData.order = reactive({ ...order });
          // Default to highest ranked factory
          modalData.selectedFactoryId = rankedFactories.value.length > 0 ? rankedFactories.value[0].id : '';
          activeModal.value = 'dispatchModal';
        };

        const getWhatsAppPayloadText = (order, factoryId) => {
          if (!order) return '';
          const targetFactory = factories.value.find(f => f.id === factoryId) || factories.value[0];
          const factoryName = targetFactory ? targetFactory.name : 'Factory Partner';

          let payload = `🏭 *HOMEAURA PRODUCTION ORDER DISPATCH*
`;
          payload += `------------------------------------
`;
          payload += `*Target Factory:* ${factoryName}
`;
          payload += `*Order Ref:* ${order.id}
`;
          payload += `*Consignment No (CN):* ${order.cnNumber || 'N/A'}
`;
          payload += `*Factory Invoice No:* ${order.invoiceNumber || 'N/A'}
`;
          payload += `*Date:* ${order.timestamp}
`;
          payload += `*Product:* ${order.productCategory} (${order.seatConfig})
`;
          payload += `*Client Name:* ${order.customerName}
`;
          payload += `*Client Contact:* ${order.customerPhone}
`;
          payload += `*Delivery Address:* ${order.customerAddress}
`;
          if (order.extraDetails) payload += `*Fabric & Specs:* ${order.extraDetails}
`;
          if (order.notes) payload += `*Special Notes:* ${order.notes}
`;
          if (order.photoFileName) payload += `*Product Photo:* ${order.photoFileName}
`;
          if (order.collagePhotoFileName) payload += `*Design Collage:* ${order.collagePhotoFileName}
`;
          if (order.socialProofFileName) payload += `*Chat Proof:* ${order.socialProofFileName}
`;
          if (order.collagePhotoUrl && !order.collagePhotoUrl.startsWith('data:')) payload += `*Collage Link:* ${order.collagePhotoUrl}
`;
          payload += `------------------------------------
`;
          payload += `Please confirm fabric stock & production timeline.`;

          return payload;
        };

        const executeWhatsAppDispatch = async () => {
          if (!modalData.order || !modalData.selectedFactoryId) return;
          const targetFactory = factories.value.find(f => f.id === modalData.selectedFactoryId);
          if (!targetFactory) return;

          const order = modalData.order;

          // Update order's factory tag and set pipeline status to 'Factory Submit'
          const realOrder = orders.value.find(o => o.id === order.id);
          if (realOrder) {
            realOrder.factoryTag = targetFactory.name;
            realOrder.status = 'Factory Submit';
            saveOrders();
          }

          const messageText = getWhatsAppPayloadText(order, modalData.selectedFactoryId);
          const encodedMessage = encodeURIComponent(messageText);

          let waUrl = '';
          if (targetFactory.waGroupLink) {
            waUrl = targetFactory.waGroupLink;
          } else {
            const cleanPhone = (targetFactory.phone || '').replace(/[^0-9]/g, '');
            waUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
          }

          // Automatically copy ONLY the image to clipboard
          try {
            if (order.collagePhotoUrl && order.collagePhotoUrl.startsWith('data:image/')) {
              // Convert image to PNG for universal clipboard support
              const img = new Image();
              img.src = order.collagePhotoUrl;
              await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
              });
              
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0);
              
              const pngBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
              await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': pngBlob })
              ]);
              alert('✅ Collage Photo copied to clipboard!\n\nPress Ctrl+V (or Cmd+V) to paste it directly into the WhatsApp chat once it opens.');
            } else {
              await navigator.clipboard.writeText(messageText);
              if (targetFactory.waGroupLink) {
                alert('✅ Order Details copied to clipboard!\n\nPress Ctrl+V (or Cmd+V) to paste them into the WhatsApp group.');
              }
            }
          } catch (err) {
            console.error('Clipboard copy failed:', err);
            if (targetFactory.waGroupLink) {
               try {
                 await navigator.clipboard.writeText(messageText);
                 alert('Order details copied to clipboard! Paste them in the WhatsApp group.');
               } catch(e) {}
            }
          }

          window.open(waUrl, '_blank');
          closeModal();
        };

        // --- COURIER TRACKING MODAL METHODS ---
        
        const openCourierModal = (order) => {
          modalData.title = `Courier Site Verification: Order ${order.id}`;
          modalData.order = reactive({ ...order });
          modalData.newStatus = order.status;
          activeModal.value = 'courierModal';
        };


        const updateCourierStatus = () => {
          if (!modalData.order) return;
          const realOrder = orders.value.find(o => o.id === modalData.order.id);
          if (realOrder) {
            realOrder.status = modalData.newStatus;
            saveOrders();
          }
          closeModal();
        };

        // --- PHOTO LIGHTBOX METHOD ---
        const openPhotoModal = (url, id) => {
          modalData.title = `Collage Photo Attachment - Order ${id || ''}`;
          modalData.url = url;
          activeModal.value = 'photoModal';
        };

        // --- STATUS STYLING HELPER ---
        const getStatusStyle = (status) => {
          switch (status) {
            case 'Confirmation Call': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
            case 'Courier Booking': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Factory Submit': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'Courier Pending': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
            case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'Partial Delivered': return 'bg-teal-50 text-teal-700 border-teal-200';
            case 'Returned from Customer': return 'bg-rose-50 text-rose-700 border-rose-200';
            case 'Returned Received': return 'bg-slate-100 text-slate-700 border-slate-300';
            default: return 'bg-slate-50 text-slate-700 border-slate-200';
          }
        };

        // --- CATEGORY SETUP ---
        const addCategory = () => {
          if (newCategoryName.value && !categories.value.includes(newCategoryName.value)) {
            categories.value.push(newCategoryName.value);
            saveCategories();
            newCategoryName.value = '';
          }
        };

        const removeCategory = (index) => {
          categories.value.splice(index, 1);
          saveCategories();
        };

        // --- GOOGLE SHEETS CSV EXPORT ENGINE ---
        const exportCSV = () => {
          const headers = ['Order ID', 'CN Number', 'Invoice Number', 'Timestamp', 'Merchant', 'Customer Name', 'Phone', 'Shipping Address', 'Source', 'Product', 'Seat Config', 'Fulfillment', 'Sale Price (BDT)', 'Delivery Charge (BDT)', 'Total Price (BDT)', 'Pipeline Status', 'Urgent Flag', 'Collage Path (collages/)', 'Chat Proof Path (screenshots/)', 'Product Photo Path (photos/)', 'Notes'];
          
          const rows = orders.value.map(o => [
            `"${o.id}"`,
            `"${o.cnNumber || ''}"`,
            `"${o.invoiceNumber || ''}"`,
            `"${o.timestamp}"`,
            `"${o.merchantName}"`,
            `"${o.customerName.replace(/"/g, '""')}"`,
            `"${o.customerPhone}"`,
            `"${o.customerAddress.replace(/"/g, '""')}"`,
            `"${o.trafficSource}"`,
            `"${o.productCategory}"`,
            `"${o.seatConfig}"`,
            `"${o.fulfillmentMethod}"`,
            o.saleAmount,
            o.deliveryCharge,
            o.totalAmount,
            `"${o.status}"`,
            o.urgent ? 'YES' : 'NO',
            `"${o.collagePhotoFileName || ''}"`,
            `"${o.socialProofFileName || ''}"`,
            `"${o.photoFileName || ''}"`,
            `"${(o.notes || '').replace(/"/g, '""')}"`
          ]);

          const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
          const encodedUri = encodeURI(csvContent);
          const link = document.createElement('a');
          link.setAttribute('href', encodedUri);
          link.setAttribute('download', `HomeAura_Master_Ledger_Export_${new Date().toISOString().slice(0, 10)}.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

        const exportLogsCSV = () => {
          const headers = ['Log ID', 'Order ID', 'Timestamp', 'User', 'Action', 'Details'];
          const rows = orderLogs.value.map(l => [
            `"${l.id}"`,
            `"${l.orderId}"`,
            `"${l.timestamp}"`,
            `"${l.user}"`,
            `"${l.action}"`,
            `"${(l.details || '').replace(/"/g, '""')}"`
          ]);
          const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
          const encodedUri = encodeURI(csvContent);
          const link = document.createElement('a');
          link.setAttribute('href', encodedUri);
          link.setAttribute('download', `HomeAura_Audit_Logs_${new Date().toISOString().slice(0, 10)}.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

        // --- MODAL CONTROLS ---
        const openEditOrderModal = (order) => {
          if (currentUser.value?.role === 'seller' && order.merchantName !== currentUser.value?.name && order.merchantId !== currentUser.value?.id) {
            alert("⚠️ Security restriction: You cannot edit orders assigned to other merchants/sellers.");
            return;
          }
          modalData.title = `Edit Order: ${order.id}`;
          modalData.order = reactive({ ...order });
          activeModal.value = 'editOrder';
        };

        const saveEditedOrder = () => {
          const idx = orders.value.findIndex(o => o.id === modalData.order.id);
          if (idx !== -1) {
            const oldStatus = orders.value[idx].status;
            // One-way status enforcement for sellers
            if (currentUser.value.role === 'seller') {
              const newStatus = modalData.order.status;
              const oldIdx = pipelineStages.indexOf(oldStatus);
              const newIdx = pipelineStages.indexOf(newStatus);
              if (newIdx < oldIdx) {
                alert('⚠️ Sellers can only update order status in one way (forward pipeline stages). Backwards status updates are restricted to Admins.');
                modalData.order.status = oldStatus;
                return;
              }
            }
            modalData.order.totalAmount = (modalData.order.saleAmount || 0) + (modalData.order.deliveryCharge || 0);
            
            let updateDetails = 'Modified in details modal';
            if (oldStatus !== modalData.order.status) {
              updateDetails = `Status changed to ${modalData.order.status}`;
            }
            logOrderEvent(modalData.order.id, 'Order Updated', updateDetails);

            orders.value[idx] = { ...modalData.order };
            saveOrders();
          }
          closeModal();
        };

        const confirmVoidOrder = (order) => {
          if (currentUser.value?.role === 'seller' && order.merchantName !== currentUser.value?.name && order.merchantId !== currentUser.value?.id) {
            alert("⚠️ Security restriction: You cannot void orders assigned to other merchants.");
            return;
          }
          modalData.title = 'Confirm Void Order';
          modalData.order = order;
          activeModal.value = 'confirmVoid';
        };

        const executeVoidOrder = () => {
          const orderToVoid = orders.value.find(o => o.id === modalData.order.id);
          if (orderToVoid) {
            orderToVoid.deletedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
            deletedOrders.value.unshift(orderToVoid);
            orders.value = orders.value.filter(o => o.id !== modalData.order.id);
            logOrderEvent(orderToVoid.id, 'Order Voided', 'Moved to voided bin');
            saveOrders();
            saveDeletedOrders();
            selectedOrders.value.delete(modalData.order.id);
          }
          closeModal();
        };

        const restoreOrder = (order) => {
          if (currentUser.value?.role === 'seller' && order.merchantName !== currentUser.value?.name && order.merchantId !== currentUser.value?.id) {
            alert("⚠️ Security restriction: You cannot restore orders assigned to other merchants.");
            return;
          }
          deletedOrders.value = deletedOrders.value.filter(o => o.id !== order.id);
          delete order.deletedAt;
          orders.value.push(order);
          saveOrders();
          saveDeletedOrders();
        };

        const emptyTrash = () => {
          if (confirm('Are you sure you want to permanently delete all items in the trash? This action cannot be undone.')) {
            const permanentlyDeletedIds = deletedOrders.value.map(o => o.id);
            deletedOrders.value = [];
            saveDeletedOrders();
            
            // Clean up linked factory bills to remove permanently deleted orders
            let billsChanged = false;
            factoryBills.value.forEach(bill => {
              if (bill.linkedOrderIds) {
                const originalLength = bill.linkedOrderIds.length;
                bill.linkedOrderIds = bill.linkedOrderIds.filter(id => !permanentlyDeletedIds.includes(id));
                if (bill.linkedOrderIds.length !== originalLength) billsChanged = true;
              }
            });
            if (billsChanged) saveFactoryBills();
          }
        };
        
        const toggleOrderSelection = (id) => {
          if (selectedOrders.value.has(id)) {
            selectedOrders.value.delete(id);
          } else {
            selectedOrders.value.add(id);
          }
        };

        const toggleAllSelection = (filteredArray) => {
          if (selectedOrders.value.size === filteredArray.length) {
            selectedOrders.value.clear();
          } else {
            filteredArray.forEach(o => selectedOrders.value.add(o.id));
          }
        };

        const bulkDeleteSelected = () => {
          if (selectedOrders.value.size === 0) return;
          if (currentUser.value?.role === 'seller') {
             const toDeleteIds = Array.from(selectedOrders.value);
             const hasOthers = orders.value.some(o => toDeleteIds.includes(o.id) && o.merchantName !== currentUser.value?.name && o.merchantId !== currentUser.value?.id);
             if (hasOthers) {
               alert("⚠️ Security restriction: You cannot void orders assigned to other merchants.");
               return;
             }
          }
          if (!confirm(`Are you sure you want to void ${selectedOrders.value.size} selected order(s)?`)) return;

          const toDeleteIds = Array.from(selectedOrders.value);
          const ordersToMove = orders.value.filter(o => toDeleteIds.includes(o.id));
          
          const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
          ordersToMove.forEach(o => {
            o.deletedAt = now;
            deletedOrders.value.unshift(o);
          });
          
          orders.value = orders.value.filter(o => !toDeleteIds.includes(o.id));
          saveOrders();
          saveDeletedOrders();
          selectedOrders.value.clear();
        };
        
        const saveAppsScriptUrl = () => {
          localforage.setItem('homeaura_apps_script_url', appsScriptUrl.value);
          alert('Apps Script Backup URL saved!');
        };
        
        const isAutoPulling = ref(false);
        let autoPullInterval = null;

        const toggleAutoPull = () => {
          if (!appsScriptUrl.value) {
            alert('Please enter your Google Apps Script Web App URL first.');
            return;
          }
          isAutoPulling.value = !isAutoPulling.value;
          if (isAutoPulling.value) {
            if (!confirm('Warning: Enabling Auto-Pull will automatically overwrite your local data with cloud data every 10 seconds. This is recommended ONLY for read-only remote admins. Proceed?')) {
              isAutoPulling.value = false;
              return;
            }
            fetchFromGoogleSheets(true);
            autoPullInterval = setInterval(() => {
              fetchFromGoogleSheets(true);
            }, 10000); // 10 seconds
            syncStatusMsg.value = 'Auto-Pull Enabled (10s intervals)';
            syncStatusColor.value = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800';
          } else {
            clearInterval(autoPullInterval);
            syncStatusMsg.value = 'Auto-Pull Disabled';
            syncStatusColor.value = 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800';
          }
        };

        const fetchFromGoogleSheets = async (isAuto = false) => {
          if (!appsScriptUrl.value) {
            if (!isAuto) alert('Please enter your Google Apps Script Web App URL first.');
            return;
          }
          if (!isAuto && !confirm('Warning: This will overwrite your current local data with the cloud data. Proceed?')) return;
          
          if (!isAuto) {
            isTestingSync.value = true;
            syncStatusMsg.value = 'Fetching latest data...';
          }
          try {
            const res = await fetch(appsScriptUrl.value + "?action=getData", { redirect: 'follow' });
            const data = await res.json();
            if (data.status === 'success' && data.snapshot) {
              const snap = data.snapshot;
              if (snap.users && snap.users.length) users.value = snap.users;
              if (snap.categories && snap.categories.length) categories.value = snap.categories;
              if (snap.factories && snap.factories.length) factories.value = snap.factories;
              
              // --- SMART LOCAL FILTERING ENGINE ---
              let loadedOrders = snap.orders || [];
              let loadedLogs = snap.orderLogs || [];
              let loadedDeleted = snap.deletedOrders || [];
              let loadedBills = snap.factoryBills || [];

              const user = currentUser.value;
              if (user) {
                if (user.role.toLowerCase() === 'admin') {
                  // Admin: Only load the last 7 days of data into memory to save space
                  const sevenDaysAgo = new Date();
                  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                  
                  const filterByDate = (arr) => arr.filter(item => {
                    if (!item.timestamp) return false;
                    return new Date(item.timestamp) >= sevenDaysAgo;
                  });
                  
                  loadedOrders = filterByDate(loadedOrders);
                  loadedLogs = filterByDate(loadedLogs);
                  loadedDeleted = filterByDate(loadedDeleted);
                  // Usually keep all active bills for admins or filter them too. We'll filter them to keep it clean.
                  loadedBills = filterByDate(loadedBills); 
                } else {
                  // Merchant: Only load their own data into memory
                  const myId = user.id;
                  loadedOrders = loadedOrders.filter(o => o.merchantId === myId);
                  loadedDeleted = loadedDeleted.filter(o => o.merchantId === myId);
                  
                  // Filter logs to only those connected to my orders
                  const myOrderIds = new Set([...loadedOrders.map(o=>o.id), ...loadedDeleted.map(o=>o.id)]);
                  loadedLogs = loadedLogs.filter(log => myOrderIds.has(log.orderId));
                  
                  // Merchants don't need factory bills
                  loadedBills = [];
                }
              }

              orders.value = loadedOrders;
              orderLogs.value = loadedLogs;
              deletedOrders.value = loadedDeleted;
              factoryBills.value = loadedBills;
              
              saveDataLocally(); // LocalStorage save
              
              if (!isAuto) {
                syncStatusMsg.value = 'Data successfully synced from cloud!';
                syncStatusColor.value = 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800';
              }
            } else {
              throw new Error(data.message || 'Unknown server error');
            }
          } catch(e) {
            if (!isAuto) {
              syncStatusMsg.value = 'Fetch failed: ' + e.message;
              syncStatusColor.value = 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800';
            }
          } finally {
            if (!isAuto) isTestingSync.value = false;
          }
        };

        const testSyncConnection = async () => {
          if (!appsScriptUrl.value) {
            syncStatusMsg.value = 'No URL provided!';
            syncStatusColor.value = 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800';
            return;
          }
          isTestingSync.value = true;
          syncStatusMsg.value = 'Testing connection over the network...';
          syncStatusColor.value = 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800';
          try {
            const testPayload = { action: 'sync', snapshot: { _connectionTest: [{ timestamp: new Date().toISOString(), message: "Connection successful. System is online!" }] } };
            await fetch(appsScriptUrl.value, {
              method: 'POST',
              mode: 'no-cors',
              headers: { 'Content-Type': 'text/plain;charset=utf-8' },
              body: JSON.stringify(testPayload)
            });
            syncStatusMsg.value = 'Connection payload dispatched successfully. Please check your Google Sheet for a new tab named "_connectionTest".';
            syncStatusColor.value = 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800';
          } catch (err) {
            syncStatusMsg.value = 'Network Error: ' + err.message;
            syncStatusColor.value = 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800';
          } finally {
            isTestingSync.value = false;
          }
        };
        
        let syncTimeout = null;
        let lastLocalEditTime = Date.now();
        
        const triggerAutoSync = () => {
          lastLocalEditTime = Date.now();
          if (!appsScriptUrl.value) return;
          if (syncTimeout) clearTimeout(syncTimeout);
          syncTimeout = setTimeout(() => {
            backupToGoogleSheets(true);
          }, 2000); 
        };

        const getCleanSnapshot = () => {
          const clean = (collection) => collection.map(item => {
            const copy = { ...item };
            if (copy.collagePhotoUrl && copy.collagePhotoUrl.startsWith('data:')) {
               copy.collagePhotoUrl = 'Pending Sync...';
            }
            if (copy.socialProofUrl && copy.socialProofUrl.startsWith('data:')) {
               copy.socialProofUrl = 'Pending Sync...';
            }
            return copy;
          });
          return {
            users: users.value,
            orders: clean(orders.value),
            orderLogs: orderLogs.value,
            deletedOrders: clean(deletedOrders.value),
            categories: categories.value,
            factories: factories.value,
            factoryBills: clean(factoryBills.value),
            timestamp: new Date().toISOString()
          };
        };

        const backupToGoogleSheets = async (isAuto = false) => {
          if (!appsScriptUrl.value) {
            if (!isAuto) alert('Please enter and save your Google Apps Script Web App URL first.');
            return;
          }
          isBackingUp.value = true;
          try {
            const snapshot = getCleanSnapshot();
            await fetch(appsScriptUrl.value, {
              redirect: 'follow',
              method: 'POST',
              headers: { 'Content-Type': 'text/plain;charset=utf-8' },
              body: JSON.stringify({ action: 'sync', snapshot: snapshot })
            });
            if (!isAuto) alert('Backup data sent to Google Sheets successfully!\n(Please allow a few moments for the sheet to update).');
          } catch (err) {
            if (!isAuto) alert('Error sending backup: ' + err.message);
            console.error('Auto-sync error:', err);
          } finally {
            isBackingUp.value = false;
          }
        };

        // --- BACKGROUND IMAGE UPLOAD ENGINE ---
        const initImageDB = () => new Promise((resolve, reject) => {
          const req = indexedDB.open('HomeAuraImageSync', 1);
          req.onupgradeneeded = e => {
            if (!e.target.result.objectStoreNames.contains('images')) {
              e.target.result.createObjectStore('images', { keyPath: 'id' });
            }
          };
          req.onsuccess = e => resolve(e.target.result);
          req.onerror = e => reject(e);
        });

        const queueImageUpload = async (file, fileName, type) => {
          const base64Full = await fileToBase64(file);
          const base64Data = base64Full.split(',')[1];
          const payload = {
            id: Date.now() + Math.random(),
            base64Full,
            base64Data,
            mimeType: file.type,
            fileName,
            type
          };
          
          try {
            const db = await initImageDB();
            await new Promise((resolve) => {
              const tx = db.transaction('images', 'readwrite');
              tx.objectStore('images').put(payload);
              tx.oncomplete = () => resolve();
            });
          } catch (e) {
            console.error('Failed to queue image in IndexedDB', e);
          }
          return base64Full;
        };

        let isProcessingUploads = false;
        const processUploadQueue = async () => {
          if (isProcessingUploads || !appsScriptUrl.value) return;
          isProcessingUploads = true;
          
          try {
            const db = await initImageDB();
            const images = await new Promise((resolve) => {
              const tx = db.transaction('images', 'readonly');
              const req = tx.objectStore('images').getAll();
              req.onsuccess = () => resolve(req.result);
            });
            
            let uploadedAny = false;
            
            for (const img of images) {
              try {
                const payload = {
                  action: 'uploadImage',
                  fileName: img.fileName,
                  mimeType: img.mimeType,
                  base64: img.base64Data
                };
                
                const response = await fetch(appsScriptUrl.value, {
                  redirect: 'follow',
                  method: 'POST',
                  headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                  body: JSON.stringify(payload)
                });
                
                const data = await response.json();
                
                if (data.status === 'success' && data.url) {
                  let replaced = false;
                  const replaceIn = (collection) => {
                    collection.forEach(item => {
                      if (item.collagePhotoUrl === img.base64Full) { item.collagePhotoUrl = data.url; replaced = true; }
                      if (item.socialProofUrl === img.base64Full) { item.socialProofUrl = data.url; replaced = true; }
                    });
                  };
                  replaceIn(orders.value);
                  replaceIn(factoryBills.value);
                  if (intakeForm.collagePhotoUrl === img.base64Full) intakeForm.collagePhotoUrl = data.url;
                  if (intakeForm.socialProofUrl === img.base64Full) intakeForm.socialProofUrl = data.url;
                  
                  await new Promise(resolve => {
                    const tx = db.transaction('images', 'readwrite');
                    tx.objectStore('images').delete(img.id);
                    tx.oncomplete = () => resolve();
                  });
                  
                  if (replaced) uploadedAny = true;
                }
              } catch(e) {
                console.warn('Background upload failed for', img.fileName, e);
                break; // Break and try again next loop
              }
            }
            
            if (uploadedAny) {
              saveOrders();
              saveDataLocally();
              triggerAutoSync(); 
            }
          } catch(e) {
            console.error('Queue processing error', e);
          } finally {
            isProcessingUploads = false;
          }
        };

        const startAutoSyncLoop = () => {
          setInterval(async () => {
            if (!appsScriptUrl.value) return;
            
            // 1. Always try to process offline image queue
            await processUploadQueue();
            
            // 2. Safely pull data if user hasn't edited anything in the last 10 seconds
            if (Date.now() - lastLocalEditTime > 10000 && !isBackingUp.value) {
               fetchFromGoogleSheets(true);
            }
          }, 5000);
        };


        const copyConsignmentNumber = (cn) => {
          if (!cn) return;
          navigator.clipboard.writeText(cn);
          alert('Copied Consignment Number: ' + cn);
        };

        const exportSnapshot = () => {
          const snapshot = {
            users: users.value,
            orders: orders.value,
            orderLogs: orderLogs.value,
            deletedOrders: deletedOrders.value,
            categories: categories.value,
            factories: factories.value,
              factoryBills: factoryBills.value,
              timestamp: new Date().toISOString()
          };
          const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `homeaura_snapshot_${new Date().toISOString().substring(0,10)}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        };
        
        const importSnapshot = (event) => {
          const file = event.target.files[0];
          if (!file) return;
          
          if (!confirm('Warning: Restoring from a snapshot will completely overwrite the current system data. Proceed?')) {
            event.target.value = '';
            return;
          }

          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const snapshot = JSON.parse(e.target.result);
              if (snapshot.users && snapshot.orders) {
                users.value = snapshot.users;
                orders.value = snapshot.orders;
                orderLogs.value = snapshot.orderLogs || [];
                deletedOrders.value = snapshot.deletedOrders || [];
                categories.value = snapshot.categories || [];
                factories.value = snapshot.factories || [];
                factoryBills.value = snapshot.factoryBills || [];
                  localforage.setItem('homeaura_users', JSON.stringify(users.value));
                  localforage.setItem('homeaura_orders', JSON.stringify(orders.value));
                  localforage.setItem('homeaura_deleted_orders', JSON.stringify(deletedOrders.value));
                  localforage.setItem('homeaura_categories', JSON.stringify(categories.value));
                  localforage.setItem('homeaura_factories', JSON.stringify(factories.value));
                  localforage.setItem('homeaura_factory_bills', JSON.stringify(factoryBills.value));
                
                alert('Snapshot restored successfully! The application will now reload to apply changes.');
                window.location.reload();
                event.target.value = '';
              } else {
                alert('Invalid snapshot file format.');
              }
            } catch (err) {
              alert('Error parsing JSON file.');
            }
          };
          reader.readAsText(file);
        };


        const openAddUserModal = () => {
          modalData.title = 'Register New User Profile';
          modalData.user = reactive({ name: '', username: '', password: '1234', role: 'seller', active: true, target: 300000 });
          activeModal.value = 'userModal';
        };

        const openEditUserModal = (user) => {
          modalData.title = `Edit Profile: @${user.username}`;
          modalData.user = reactive({ ...user });
          activeModal.value = 'userModal';
        };

        const saveUserModal = () => {
          const idx = users.value.findIndex(u => u.username === modalData.user.username);
          if (idx !== -1) {
            users.value[idx] = { ...modalData.user };
          } else {
            modalData.user.id = 'u' + (users.value.length + 1);
            users.value.push({ ...modalData.user });
          }
          saveUsers();
          closeModal();
        };

        const toggleUserActive = (user) => {
          user.active = !user.active;
          saveUsers();
        };

        const closeModal = () => {
          activeModal.value = null;
          modalData.order = null;
          modalData.user = null;
        };

        onMounted(() => {
          applyDarkMode();
          loadInitialData();
          startAutoSyncLoop();

          window.addEventListener('paste', (e) => {
            if (!selectedProofTile.value && !selectedCollageTile.value) return;

            // Check if user is actively typing inside text inputs/textareas
            const activeElem = document.activeElement;
            const tag = activeElem ? activeElem.tagName.toLowerCase() : '';
            const isTextInput = tag === 'textarea' || (tag === 'input' && activeElem.type === 'text');

            if (isTextInput) {
              // If clipboard items contain an image, process screenshot proof
              const items = e.clipboardData && e.clipboardData.items;
              let hasImage = false;
              if (items) {
                for (let i = 0; i < items.length; i++) {
                  if (items[i].type.indexOf('image') !== -1) {
                    hasImage = true;
                    break;
                  }
                }
              }
              if (!hasImage) return; // Allow normal text paste inside text fields
            }

            if (selectedProofTile.value === 'terminal') {
              handleProofPaste(e, intakeForm);
            } else if (selectedProofTile.value === 'modal') {
              if (modalData.order) handleProofPaste(e, modalData.order);
              if (modalData.bill) handleProofPaste(e, modalData.bill); // Support pasting photoUrl into bill
            }

            if (selectedCollageTile.value === 'terminal') {
              handleCollagePaste(e, intakeForm);
            } else if (selectedCollageTile.value === 'modal') {
              if (modalData.order) handleCollagePaste(e, modalData.order);
            }
          });
        });

        // Setup deep watchers to trigger auto-sync on any data change
        watch(
          [users, orders, deletedOrders, categories, factories, factoryBills],
          () => {
            triggerAutoSync();
          },
          { deep: true }
        );

        return {
          factoryBills,
          openAddBillModal,
          openViewBillModal,
          getLinkedOrderDetails,
          openEditBillModal,
          saveBillModal,
          deleteBill,
          getFactoryName,
          pipelineStages,
          users,
          orders,
          categories,
          factories,
          sampleCollagePresets,
          rankedFactories,
          currentUser,
          isDarkMode,
          toggleDarkMode,
          openInspectModal,
          selectedProofTile,
          selectProofTile,
          activeTab,
          loginForm,
          loginError,
          deletedOrders,
          selectedOrders,
          restoreOrder,
          emptyTrash,
          toggleOrderSelection,
          toggleAllSelection,
          bulkDeleteSelected,
          appsScriptUrl,
          isBackingUp,
          isTestingSync,
          syncStatusMsg,
          syncStatusColor,
          testSyncConnection,
          isBackingUp,
          saveAppsScriptUrl,
          backupToGoogleSheets,
          fetchFromGoogleSheets,
          isAutoPulling,
          toggleAutoPull,
          exportSnapshot,
          importSnapshot,
          orderSearch,
          statusFilter,
          merchantFilter,
          factoryFilter,
          sortOption,
          urgentOnly,
          newCategoryName,
          clipboardRawText,
          parseSuccessMsg,
          intakeForm,
          activeModal,
          modalData,
          metrics,
          sellersList,
          merchantStats,
          myOrders,
          myOrdersCount,
          myMonthlySales,
          myTargetPercentage,
          dispatchDeskOrders,
          filteredOrders,
          formatBDT,
          handleLogin,
          handleLogout,
          parseClipboard,
          submitNewOrder,
          quickStatusChange,
          toggleUrgent,

          saveMediaToHostDisk,
          copyHostRelativePath,
          mediaFolderStats,
          isPackagingZip,
          packageAndDownloadAllMediaZip,
          downloadHostFolderSetupScript,
          selectedCollageTile,
          selectCollageTile,
          handleCollageFileUpload,
          handleCollagePaste,
          handleCollageDrop,
          handleProofFileUpload,
          handleProofPaste,
          handleProofDrop,
          getAllowedStatusesForUser,
          advanceSellerStatus,
          getStatusStyle,
          addCategory,
          removeCategory,
          exportCSV,
          exportLogsCSV,
          openEditOrderModal,
          saveEditedOrder,
          confirmVoidOrder,
          executeVoidOrder,
          openAddUserModal,
          openEditUserModal,
          saveUserModal,
          toggleUserActive,
          openAddFactoryModal,
          openEditFactoryModal,
          saveFactoryModal,
          openDispatchModal,
          getWhatsAppPayloadText,
          executeWhatsAppDispatch,
          copyConsignmentNumber,
          openCourierModal,
          updateCourierStatus,
          trackingData,
          isLoadingTracking,
          openPhotoModal,
          closeModal
        };
      }
    }).mount('#app');