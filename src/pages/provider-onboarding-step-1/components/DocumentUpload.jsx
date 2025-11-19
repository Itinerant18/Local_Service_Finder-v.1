import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentUpload = ({ formData, setFormData, errors }) => {
  const [draggedOver, setDraggedOver] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});

  const documentTypes = [
    {
      key: 'businessLicense',
      label: 'Business License',
      description: 'Upload your business registration certificate or license',
      required: true,
      acceptedFormats: '.pdf,.jpg,.jpeg,.png'
    },
    {
      key: 'identityProof',
      label: 'Identity Proof',
      description: 'Aadhar Card, PAN Card, or Passport',
      required: true,
      acceptedFormats: '.pdf,.jpg,.jpeg,.png'
    },
    {
      key: 'addressProof',
      label: 'Address Verification',
      description: 'Utility bill, bank statement, or rental agreement',
      required: true,
      acceptedFormats: '.pdf,.jpg,.jpeg,.png'
    }
  ];

  const handleFileSelect = (documentKey, files) => {
    const file = files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file?.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Simulate upload progress
    setUploadProgress(prev => ({ ...prev, [documentKey]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev?.[documentKey] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [documentKey]: currentProgress + 10 };
      });
    }, 100);

    // Update form data
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev?.documents,
        [documentKey]: {
          file,
          name: file?.name,
          size: file?.size,
          uploadedAt: new Date()?.toISOString()
        }
      }
    }));
  };

  const handleDragOver = (e, documentKey) => {
    e?.preventDefault();
    setDraggedOver(documentKey);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setDraggedOver(null);
  };

  const handleDrop = (e, documentKey) => {
    e?.preventDefault();
    setDraggedOver(null);
    const files = Array.from(e?.dataTransfer?.files);
    handleFileSelect(documentKey, files);
  };

  const removeDocument = (documentKey) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev?.documents,
        [documentKey]: null
      }
    }));
    setUploadProgress(prev => {
      const updated = { ...prev };
      delete updated?.[documentKey];
      return updated;
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Document Verification</h3>
        <p className="text-sm text-muted-foreground">
          Upload clear, readable documents for verification. All documents are required for approval.
        </p>
      </div>
      {documentTypes?.map((docType) => {
        const uploadedDoc = formData?.documents?.[docType?.key];
        const progress = uploadProgress?.[docType?.key];
        const isUploading = progress !== undefined && progress < 100;
        const isDraggedOver = draggedOver === docType?.key;

        return (
          <div key={docType?.key} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground flex items-center">
                  {docType?.label}
                  {docType?.required && <span className="text-error ml-1">*</span>}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">{docType?.description}</p>
              </div>
              {uploadedDoc && !isUploading && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDocument(docType?.key)}
                  iconName="X"
                  iconSize={16}
                >
                  Remove
                </Button>
              )}
            </div>
            {!uploadedDoc ? (
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDraggedOver
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onDragOver={(e) => handleDragOver(e, docType?.key)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, docType?.key)}
              >
                <Icon name="Upload" size={32} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-sm font-medium text-foreground mb-1">
                  Drop files here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Supports: PDF, JPG, PNG (Max 5MB)
                </p>
                <input
                  type="file"
                  accept={docType?.acceptedFormats}
                  onChange={(e) => handleFileSelect(docType?.key, e?.target?.files)}
                  className="hidden"
                  id={`file-${docType?.key}`}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById(`file-${docType?.key}`)?.click()}
                  iconName="Upload"
                  iconPosition="left"
                >
                  Choose File
                </Button>
              </div>
            ) : (
              <div className="bg-muted rounded-lg p-4">
                {isUploading ? (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Uploading...</span>
                      <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                        <Icon name="FileText" size={20} className="text-success" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{uploadedDoc?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(uploadedDoc?.size)} • Uploaded successfully
                        </p>
                      </div>
                    </div>
                    <Icon name="CheckCircle" size={20} className="text-success" />
                  </div>
                )}
              </div>
            )}
            {errors?.[docType?.key] && (
              <p className="text-sm text-error mt-2">{errors?.[docType?.key]}</p>
            )}
          </div>
        );
      })}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Document Guidelines</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Ensure documents are clear and all text is readable</li>
              <li>• Upload original documents or certified copies</li>
              <li>• Documents should be valid and not expired</li>
              <li>• Processing time: 24-48 hours after submission</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;