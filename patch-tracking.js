const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldTrackingBlockRegex = /<!-- REAL-TIME TRACKING DISPLAY -->[\s\S]*?<\/div>(\s*<div v-else class="p-4 mt-4 bg-amber-50)/;

const newTrackingBlock = `<!-- REAL-TIME TRACKING DISPLAY -->
              <div class="space-y-2 mt-4" v-if="modalData.order.cnNumber">
                <label class="block font-semibold text-slate-700 dark:text-slate-300">Real-Time Tracking (Steadfast)</label>
                <div class="w-full h-80 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden relative">
                   <iframe :src="'https://steadfast.com.bd/user/consignment/' + modalData.order.cnNumber" class="w-full h-full border-0"></iframe>
                   <div class="absolute top-2 right-2">
                     <a :href="'https://steadfast.com.bd/user/consignment/' + modalData.order.cnNumber" target="_blank" class="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-900 text-white text-[10px] font-bold rounded-lg backdrop-blur-sm transition-colors shadow-sm">
                       Open in New Tab ↗
                     </a>
                   </div>
                </div>
              </div>$1`;

html = html.replace(oldTrackingBlockRegex, newTrackingBlock);

fs.writeFileSync('index.html', html);
