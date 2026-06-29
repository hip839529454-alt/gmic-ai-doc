import React, { useState } from "react";
import { API_ENDPOINTS, ApiEndpoint } from "../docsData";
import { Play, Terminal, HelpCircle, Send, Check, Copy, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ApiPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(API_ENDPOINTS[0]);
  const [headers, setHeaders] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    API_ENDPOINTS[0].headers.forEach((h) => {
      initial[h.key] = h.value;
    });
    return initial;
  });

  const [params, setParams] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    API_ENDPOINTS[0].params.forEach((p) => {
      initial[p.name] = p.default || "";
    });
    return initial;
  });

  const [requestBody, setRequestBody] = useState<string>(() => {
    return API_ENDPOINTS[0].requestBody || "";
  });

  // Simulator state
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [responseOutput, setResponseOutput] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);

  const handleEndpointSelect = (endpoint: ApiEndpoint) => {
    setSelectedEndpoint(endpoint);
    setResponseOutput(null);
    setLogs([]);
    setJsonError(null);

    // Load endpoint headers
    const initialHeaders: Record<string, string> = {};
    endpoint.headers.forEach((h) => {
      initialHeaders[h.key] = h.value;
    });
    setHeaders(initialHeaders);

    // Load endpoint params
    const initialParams: Record<string, string> = {};
    endpoint.params.forEach((p) => {
      initialParams[p.name] = p.default || "";
    });
    setParams(initialParams);

    // Load request body
    setRequestBody(endpoint.requestBody || "");
  };

  const handleHeaderChange = (key: string, value: string) => {
    setHeaders((prev) => ({ ...prev, [key]: value }));
  };

  const handleParamChange = (name: string, value: string) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleBodyChange = (value: string) => {
    setRequestBody(value);
    if (selectedEndpoint.method === "POST") {
      try {
        JSON.parse(value);
        setJsonError(null);
      } catch (err: any) {
        setJsonError(`JSON Syntax Error: ${err.message}`);
      }
    }
  };

  const executeRequest = () => {
    if (jsonError) return;

    setIsRunning(true);
    setResponseOutput(null);
    setLogs([]);

    const logSteps = [
      `📡 Initializing HTTP ${selectedEndpoint.method} connection to AetherFlow edge node...`,
      `🔑 Validating security authorization header \`Authorization: ${headers["Authorization"] || "None"}\`...`,
      `⚙️ Verifying query parameters: ${JSON.stringify(params)}`,
      ...(selectedEndpoint.method === "POST" 
        ? [`📦 Parsing and uploading JSON payload (${requestBody.length} bytes)...`, `⚡ Operator engine triggering secure sandbox isolation check...`]
        : []
      ),
      `🔗 Established persistent session, routing traffic to partition cluster broker-sh-node-01...`,
      `🎉 Simulated call succeeded! [Status Code: 200 OK] in 14ms`
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logSteps.length) {
        setLogs((prev) => [...prev, logSteps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        // Build output with replaced param values if applicable
        const finalResponse = { ...selectedEndpoint.responseTemplate };
        if (params["namespace"] && finalResponse.namespace) {
          finalResponse.namespace = params["namespace"];
        }
        if (selectedEndpoint.method === "POST" && requestBody) {
          try {
            const bodyObj = JSON.parse(requestBody);
            if (bodyObj.name && finalResponse.data) {
              finalResponse.data.name = bodyObj.name;
            }
          } catch (_) {}
        }
        setResponseOutput(finalResponse);
        setIsRunning(false);
      }
    }, 400);
  };

  const handleCopyResponse = () => {
    if (!responseOutput) return;
    navigator.clipboard.writeText(JSON.stringify(responseOutput, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getMethodBadgeColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "POST":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "PUT":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-rose-50 text-rose-700 border-rose-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Introduction Banner */}
      <div className="bg-neutral-50/70 border border-neutral-200/60 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 font-sans">AetherFlow REST API Debug Sandbox</h2>
          <p className="text-neutral-500 text-sm mt-1 max-w-2xl leading-relaxed">
            No extra server setup or Postman installation required. Dispatch simulated API requests, test query parameters, check authorization structures, and inspect real-time JSON responses returned by the streaming cluster instantly.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Cluster Gateway: Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Endpoint Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-3.5">
          <div className="font-sans font-semibold text-neutral-800 text-xs tracking-wider uppercase pl-1">
            API Endpoints
          </div>
          <div className="space-y-2">
            {API_ENDPOINTS.map((endpoint) => {
              const isSelected = selectedEndpoint.path === endpoint.path;
              return (
                <button
                  key={endpoint.path}
                  onClick={() => handleEndpointSelect(endpoint)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex flex-col gap-2 cursor-pointer ${
                    isSelected
                      ? "border-neutral-900 bg-white shadow-sm ring-1 ring-neutral-950"
                      : "border-neutral-200/70 bg-white hover:border-neutral-300 hover:bg-neutral-50/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getMethodBadgeColor(endpoint.method)}`}>
                      {endpoint.method}
                    </span>
                    <span className="font-mono text-xs font-semibold text-neutral-800 break-all">{endpoint.path}</span>
                  </div>
                  <span className="text-xs text-neutral-500 line-clamp-1 leading-normal pl-1">{endpoint.description}</span>
                </button>
              );
            })}
          </div>

          <div className="p-4 bg-neutral-50/50 border border-neutral-200/60 rounded-xl space-y-2 text-xs text-neutral-500 leading-relaxed font-sans">
            <div className="flex items-center gap-1.5 font-semibold text-neutral-700">
              <HelpCircle size={14} />
              <span>Sandbox Quick Tips</span>
            </div>
            <p>1. This sandbox automatically injects security headers. Modify or remove the Authorization header to test unauthorized error responses.</p>
            <p>2. POST request bodies must adhere to valid JSON syntax. Any formatting issues will trigger a validation warning immediately.</p>
          </div>
        </div>

        {/* Right Side: Parameter Form & Runner Console (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Header Area */}
            <div className="p-5 border-b border-neutral-100 flex flex-wrap items-center justify-between gap-3 bg-neutral-50/20">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${getMethodBadgeColor(selectedEndpoint.method)}`}>
                  {selectedEndpoint.method}
                </span>
                <span className="font-mono text-[15px] font-bold text-neutral-900 break-all">{selectedEndpoint.path}</span>
              </div>
              <button
                onClick={executeRequest}
                disabled={isRunning || !!jsonError}
                className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg text-white shadow-sm transition-all font-sans cursor-pointer ${
                  isRunning || !!jsonError
                    ? "bg-neutral-300 cursor-not-allowed text-neutral-500"
                    : "bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98]"
                }`}
              >
                {isRunning ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <Send size={13} />
                    <span>Send Request</span>
                  </>
                )}
              </button>
            </div>

            {/* Config Panels */}
            <div className="p-6 space-y-6">
              {/* HTTP Headers section */}
              <div className="space-y-3">
                <div className="font-sans font-semibold text-neutral-800 text-xs tracking-wide uppercase">
                  HTTP Headers
                </div>
                <div className="space-y-2.5">
                  {selectedEndpoint.headers.map((h) => (
                    <div key={h.key} className="flex flex-col sm:flex-row gap-2 sm:items-center">
                      <div className="sm:w-1/3 text-xs font-mono text-neutral-500 select-all">{h.key}</div>
                      <input
                        type="text"
                        value={headers[h.key] || ""}
                        onChange={(e) => handleHeaderChange(h.key, e.target.value)}
                        className="flex-1 text-xs font-mono px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 bg-white"
                        placeholder={h.description}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* URL Query Params section */}
              {selectedEndpoint.params.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-neutral-100">
                  <div className="font-sans font-semibold text-neutral-800 text-xs tracking-wide uppercase">
                    Query Parameters
                  </div>
                  <div className="space-y-3">
                    {selectedEndpoint.params.map((p) => (
                      <div key={p.name} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                        <div className="sm:col-span-4">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono font-semibold text-neutral-800">{p.name}</span>
                            {p.required ? (
                              <span className="text-[10px] text-rose-500 font-sans font-medium px-1 rounded bg-rose-50">Required</span>
                            ) : (
                              <span className="text-[10px] text-neutral-400 font-sans">Optional</span>
                            )}
                          </div>
                          <div className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">{p.description}</div>
                        </div>
                        <input
                          type="text"
                          value={params[p.name] || ""}
                          onChange={(e) => handleParamChange(p.name, e.target.value)}
                          className="sm:col-span-8 text-xs font-mono px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 bg-white"
                          placeholder={`${p.type}${p.default ? ` (Default: ${p.default})` : ""}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Request Body section */}
              {selectedEndpoint.method === "POST" && (
                <div className="space-y-3 pt-4 border-t border-neutral-100">
                  <div className="flex justify-between items-center">
                    <div className="font-sans font-semibold text-neutral-800 text-xs tracking-wide uppercase">
                      JSON Request Body (Payload)
                    </div>
                    {jsonError && (
                      <span className="text-[11px] text-rose-500 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100 font-medium">
                        {jsonError}
                      </span>
                    )}
                  </div>
                  <textarea
                    value={requestBody}
                    onChange={(e) => handleBodyChange(e.target.value)}
                    rows={6}
                    className={`w-full text-xs font-mono p-4 border rounded-xl focus:outline-none bg-neutral-900 text-neutral-100 ${
                      jsonError ? "border-rose-400 focus:border-rose-500" : "border-neutral-800 focus:border-neutral-600"
                    }`}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Running Console logs & Response Viewer */}
          <div className="space-y-4">
            <div className="font-sans font-semibold text-neutral-800 text-xs tracking-wider uppercase pl-1 flex items-center gap-2">
              <Terminal size={14} className="text-neutral-500" />
              <span>Debug Feedback Console</span>
            </div>

            <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-5 space-y-4 shadow-xl overflow-hidden relative">
              {/* Connection Grid Lines for High Aesthetic */}
              <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>

              {/* Logs Screen */}
              <div className="space-y-1.5 font-mono text-[12px] leading-relaxed relative z-10">
                {logs.length === 0 && !isRunning && !responseOutput && (
                  <div className="text-neutral-500 italic py-2">
                    No request sent yet. Click "Send Request" above to trigger simulated interaction debugging.
                  </div>
                )}
                {logs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`transition-opacity duration-300 ${
                      idx === logs.length - 1 && isRunning 
                        ? "text-blue-400 font-medium animate-pulse" 
                        : log.includes("Status Code: 200") 
                          ? "text-emerald-400 font-medium" 
                          : "text-neutral-400"
                    }`}
                  >
                    {log}
                  </div>
                ))}
                {isRunning && (
                  <div className="flex items-center gap-2 text-neutral-600 text-xs font-mono italic mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
                    Cluster Broker executing operators...
                  </div>
                )}
              </div>

              {/* Output Response Block */}
              <AnimatePresence>
                {responseOutput && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="pt-4 border-t border-neutral-800 space-y-3 relative z-10"
                  >
                    <div className="flex items-center justify-between text-xs text-neutral-400 font-sans">
                      <span className="font-medium">HTTP Response JSON (Data)</span>
                      <button
                        onClick={handleCopyResponse}
                        className="flex items-center gap-1 cursor-pointer bg-neutral-900 hover:bg-neutral-800 hover:text-white px-2.5 py-1 rounded border border-neutral-800 transition-all text-[11px]"
                      >
                        {isCopied ? (
                          <>
                            <Check size={11} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-4 rounded-xl bg-neutral-900/60 text-[12px] font-mono text-emerald-400 overflow-x-auto leading-relaxed border border-neutral-900">
                      <code>{JSON.stringify(responseOutput, null, 2)}</code>
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
