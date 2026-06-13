import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface GameProject {
  id: number;
  title: string;
  subtitle: string;
  description: string[];
  role: string;
  links: { label: string; url: string }[];
  images: string[];
  tags?: string[];
}

export const generatePortfolioPDF = async (projects: GameProject[]) => {
  // Create a landscape PDF (16:9 ratio)
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [297, 167], // 16:9 ratio in landscape
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // ===== COVER PAGE =====
  const coverCanvas = document.createElement('canvas');
  coverCanvas.width = 1920;
  coverCanvas.height = 1080;
  const ctx = coverCanvas.getContext('2d')!;
  
  // Modern gradient background
  const gradient = ctx.createLinearGradient(0, 0, 1920, 1080);
  gradient.addColorStop(0, '#0a0f1e');
  gradient.addColorStop(0.5, '#1a1f3a');
  gradient.addColorStop(1, '#0f172a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1920, 1080);
  
  // Decorative elements
  ctx.fillStyle = 'rgba(96, 165, 250, 0.05)';
  ctx.beginPath();
  ctx.arc(1600, 200, 400, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(300, 900, 350, 0, Math.PI * 2);
  ctx.fill();
  
  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 120px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Flamberge', 960, 380);
  
  // Subtitle
  ctx.fillStyle = '#93c5fd';
  ctx.font = '52px Arial, sans-serif';
  ctx.fillText('游戏作品集 · GAME PORTFOLIO', 960, 460);
  
  // Divider line
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(660, 540);
  ctx.lineTo(1260, 540);
  ctx.stroke();
  
  // Project count
  ctx.fillStyle = '#94a3b8';
  ctx.font = '28px Arial, sans-serif';
  ctx.fillText(`${projects.length} Projects`, 960, 590);
  
  // Web link button background
  ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2;
  const buttonX = 710;
  const buttonY = 640;
  const buttonW = 500;
  const buttonH = 60;
  ctx.fillRect(buttonX, buttonY, buttonW, buttonH);
  ctx.strokeRect(buttonX, buttonY, buttonW, buttonH);
  
  // Web link text
  ctx.fillStyle = '#60a5fa';
  ctx.font = 'bold 28px Arial, sans-serif';
  ctx.fillText('🌐 查看在线作品集', 960, 682);
  
  const coverImg = coverCanvas.toDataURL('image/jpeg', 0.95);
  pdf.addImage(coverImg, 'JPEG', 0, 0, pageWidth, pageHeight);
  
  // Add clickable link on cover
  const linkButtonX = (pageWidth - 130) / 2;
  const linkButtonY = 90;
  pdf.link(linkButtonX, linkButtonY, 130, 20, { url: 'https://dwarf-dodge-18436404.figma.site' });

  // ===== PROJECT PAGES =====
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    pdf.addPage();
    
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d')!;
    
    // Dark gradient background
    const bgGradient = ctx.createLinearGradient(0, 0, 1920, 1080);
    bgGradient.addColorStop(0, '#0f172a');
    bgGradient.addColorStop(1, '#1e293b');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1920, 1080);
    
    // Load images
    const loadedImages: HTMLImageElement[] = [];
    if (project.images && project.images.length > 0) {
      // Project 3: only background image; Project 5: skip background, use design images[1] and images[2]
      const imagesToLoad = project.id === 3
        ? [project.images[0]]
        : project.id === 5
          ? project.images.slice(1)
          : project.images;

      // Filter out empty strings
      const validImages = imagesToLoad.filter(img => img && img.trim() !== '');

      for (const imgSrc of validImages) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';

          await new Promise<void>((resolve) => {
            img.onload = () => {
              loadedImages.push(img);
              resolve();
            };
            img.onerror = () => resolve();
            img.src = imgSrc;
            setTimeout(() => resolve(), 3000);
          });
        } catch (error) {
          console.log('Failed to load image:', error);
        }
      }
    }
    
    // ===== LEFT SIDE: SCREENSHOTS =====
    const leftPadding = 60;
    const leftWidth = 920;

    if (loadedImages.length === 0) {
      // No images - show placeholder
      const imgAreaTop = 100;
      const imgAreaHeight = 880;

      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 10;

      // Placeholder box with gradient
      const placeholderGradient = ctx.createLinearGradient(
        leftPadding, imgAreaTop,
        leftPadding + leftWidth, imgAreaTop + imgAreaHeight
      );
      placeholderGradient.addColorStop(0, '#334155');
      placeholderGradient.addColorStop(1, '#1e293b');
      ctx.fillStyle = placeholderGradient;
      ctx.fillRect(leftPadding, imgAreaTop, leftWidth, imgAreaHeight);

      // Placeholder icon and text
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 120px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🎮', leftPadding + leftWidth / 2, imgAreaTop + imgAreaHeight / 2 - 40);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '28px Arial, sans-serif';
      ctx.fillText('图片即将添加', leftPadding + leftWidth / 2, imgAreaTop + imgAreaHeight / 2 + 80);

      ctx.textAlign = 'left';
    } else if (loadedImages.length > 0) {
      const imgAreaTop = 100;
      const imgAreaHeight = 880;
      
      if (loadedImages.length === 1) {
        // Single image - large display
        const img = loadedImages[0];
        const imgBoxWidth = leftWidth;
        const imgBoxHeight = imgAreaHeight;
        
        // Draw shadow box
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 40;
        ctx.shadowOffsetY = 10;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(leftPadding, imgAreaTop, imgBoxWidth, imgBoxHeight);
        
        // Calculate fit
        const imgRatio = img.width / img.height;
        const boxRatio = imgBoxWidth / imgBoxHeight;
        let drawWidth, drawHeight, drawX, drawY;
        
        if (imgRatio > boxRatio) {
          drawWidth = imgBoxWidth;
          drawHeight = imgBoxWidth / imgRatio;
          drawX = leftPadding;
          drawY = imgAreaTop + (imgBoxHeight - drawHeight) / 2;
        } else {
          drawHeight = imgBoxHeight;
          drawWidth = imgBoxHeight * imgRatio;
          drawX = leftPadding + (imgBoxWidth - drawWidth) / 2;
          drawY = imgAreaTop;
        }
        
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        
      } else if (loadedImages.length >= 2) {
        // Two images - stacked vertically
        const gap = 30;
        const imgBoxWidth = leftWidth;
        const imgBoxHeight = (imgAreaHeight - gap) / 2;
        
        for (let j = 0; j < 2; j++) {
          const img = loadedImages[j];
          const imgBoxY = imgAreaTop + j * (imgBoxHeight + gap);
          
          // Shadow box
          ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
          ctx.shadowBlur = 30;
          ctx.shadowOffsetY = 8;
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(leftPadding, imgBoxY, imgBoxWidth, imgBoxHeight);
          
          // Calculate fit
          const imgRatio = img.width / img.height;
          const boxRatio = imgBoxWidth / imgBoxHeight;
          let drawWidth, drawHeight, drawX, drawY;
          
          if (imgRatio > boxRatio) {
            drawWidth = imgBoxWidth;
            drawHeight = imgBoxWidth / imgRatio;
            drawX = leftPadding;
            drawY = imgBoxY + (imgBoxHeight - drawHeight) / 2;
          } else {
            drawHeight = imgBoxHeight;
            drawWidth = imgBoxHeight * imgRatio;
            drawX = leftPadding + (imgBoxWidth - drawWidth) / 2;
            drawY = imgBoxY;
          }
          
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
          ctx.shadowBlur = 0;
          ctx.shadowOffsetY = 0;
        }
      }
    }
    
    // ===== RIGHT SIDE: CONTENT =====
    const rightX = 1040;
    const rightWidth = 820;
    let yPos = 100;
    
    // Project number badge
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.fillRect(rightX, yPos, 100, 40);
    ctx.fillStyle = '#60a5fa';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${i + 1} / ${projects.length}`, rightX + 50, yPos + 28);
    
    ctx.textAlign = 'left';
    yPos += 70;
    
    // Subtitle
    ctx.fillStyle = '#60a5fa';
    ctx.font = '22px Arial, sans-serif';
    ctx.fillText(project.subtitle, rightX, yPos);
    yPos += 60; // Increased spacing
    
    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 56px Arial, sans-serif';
    const titleLines = wrapText(ctx, project.title, rightWidth, 56);
    for (const line of titleLines) {
      ctx.fillText(line, rightX, yPos);
      yPos += 65;
    }
    
    yPos += 5; // Reduced spacing after title for tags
    
    // Tags
    if (project.tags && project.tags.length > 0) {
      let tagX = rightX;
      for (const tag of project.tags) {
        // Tag background
        const tagWidth = ctx.measureText(tag).width + 24;
        ctx.fillStyle = 'rgba(147, 197, 253, 0.15)';
        ctx.fillRect(tagX, yPos - 24, tagWidth, 32);
        
        // Tag text
        ctx.fillStyle = '#93c5fd';
        ctx.font = '16px Arial, sans-serif';
        ctx.fillText(tag, tagX + 12, yPos);
        
        tagX += tagWidth + 10;
      }
      yPos += 45; // Adjusted spacing after tags
    }
    
    // Section divider
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(rightX, yPos);
    ctx.lineTo(rightX + rightWidth - 60, yPos);
    ctx.stroke();
    yPos += 35;
    
    // Description
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '20px Arial, sans-serif';
    
    for (const paragraph of project.description) {
      const lines = wrapText(ctx, paragraph, rightWidth - 60, 20);
      for (const line of lines) {
        ctx.fillText(line, rightX, yPos);
        yPos += 30;
      }
      yPos += 8;
    }
    
    yPos += 25;
    
    // Role section
    ctx.fillStyle = '#60a5fa';
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText('● 项目角色', rightX, yPos);
    yPos += 32;
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '22px Arial, sans-serif';
    ctx.fillText(project.role, rightX + 20, yPos);
    yPos += 45;
    
    // Links section
    ctx.fillStyle = '#60a5fa';
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText('● 相关链接', rightX, yPos);
    yPos += 32;
    
    ctx.fillStyle = '#3b82f6';
    ctx.font = '18px Arial, sans-serif';
    
    const linkYPositions: { y: number; label: string; url: string }[] = [];
    
    for (const link of project.links) {
      // Link background
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.fillRect(rightX + 20, yPos - 22, rightWidth - 100, 30);
      
      // Link text
      ctx.fillStyle = '#60a5fa';
      ctx.fillText('↗ ' + link.label, rightX + 30, yPos);
      
      // Store position for PDF link
      linkYPositions.push({ y: yPos - 22, label: link.label, url: link.url });
      
      yPos += 38;
    }
    
    const projectImg = canvas.toDataURL('image/jpeg', 0.95);
    pdf.addImage(projectImg, 'JPEG', 0, 0, pageWidth, pageHeight);
    
    // Add clickable links to PDF
    for (const linkPos of linkYPositions) {
      const linkX = 137; // rightX converted to mm
      const linkY = (linkPos.y / 1080) * pageHeight;
      const linkW = 105;
      const linkH = 8;
      pdf.link(linkX, linkY, linkW, linkH, { url: linkPos.url });
    }
  }

  // ===== CONTACT PAGE =====
  pdf.addPage();
  
  const contactCanvas = document.createElement('canvas');
  contactCanvas.width = 1920;
  contactCanvas.height = 1080;
  const ctxContact = contactCanvas.getContext('2d')!;
  
  // Background
  const contactGradient = ctxContact.createLinearGradient(0, 0, 1920, 1080);
  contactGradient.addColorStop(0, '#0a0f1e');
  contactGradient.addColorStop(0.5, '#1a1f3a');
  contactGradient.addColorStop(1, '#0f172a');
  ctxContact.fillStyle = contactGradient;
  ctxContact.fillRect(0, 0, 1920, 1080);
  
  // Decorative circles
  ctxContact.fillStyle = 'rgba(96, 165, 250, 0.05)';
  ctxContact.beginPath();
  ctxContact.arc(1600, 200, 350, 0, Math.PI * 2);
  ctxContact.fill();
  ctxContact.beginPath();
  ctxContact.arc(300, 900, 300, 0, Math.PI * 2);
  ctxContact.fill();
  
  // Title
  ctxContact.fillStyle = '#ffffff';
  ctxContact.font = 'bold 72px Arial, sans-serif';
  ctxContact.textAlign = 'center';
  ctxContact.fillText('联系方式', 960, 340);
  
  // Divider
  ctxContact.strokeStyle = '#60a5fa';
  ctxContact.lineWidth = 2;
  ctxContact.beginPath();
  ctxContact.moveTo(760, 370);
  ctxContact.lineTo(1160, 370);
  ctxContact.stroke();
  
  let contactY = 460;
  
  // Email
  ctxContact.fillStyle = '#94a3b8';
  ctxContact.font = '24px Arial, sans-serif';
  ctxContact.fillText('EMAIL', 960, contactY);
  contactY += 40;
  
  ctxContact.fillStyle = '#60a5fa';
  ctxContact.font = 'bold 32px Arial, sans-serif';
  ctxContact.fillText('bojun_fang@163.com', 960, contactY);
  contactY += 70;
  
  // Itch.io
  ctxContact.fillStyle = '#94a3b8';
  ctxContact.font = '24px Arial, sans-serif';
  ctxContact.fillText('ITCH.IO', 960, contactY);
  contactY += 40;
  
  ctxContact.fillStyle = '#93c5fd';
  ctxContact.font = '28px Arial, sans-serif';
  ctxContact.fillText('flamberge-backtrace.itch.io', 960, contactY);
  contactY += 70;
  
  // Bilibili
  ctxContact.fillStyle = '#94a3b8';
  ctxContact.font = '24px Arial, sans-serif';
  ctxContact.fillText('BILIBILI', 960, contactY);
  contactY += 40;
  
  ctxContact.fillStyle = '#93c5fd';
  ctxContact.font = '28px Arial, sans-serif';
  ctxContact.fillText('space.bilibili.com/39686351', 960, contactY);
  contactY += 90;
  
  // Footer
  ctxContact.fillStyle = '#64748b';
  ctxContact.font = '22px Arial, sans-serif';
  ctxContact.fillText('感谢查看我的作品集 · Thank you for viewing', 960, contactY);
  
  const contactImg = contactCanvas.toDataURL('image/jpeg', 0.95);
  pdf.addImage(contactImg, 'JPEG', 0, 0, pageWidth, pageHeight);
  
  // Add clickable links on contact page
  // Email link (centered)
  const emailY = (500 / 1080) * pageHeight; // Position of email text
  pdf.link(pageWidth / 2 - 42, emailY - 4, 84, 9, { url: 'mailto:bojun_fang@163.com' });
  
  // Itch.io link (centered)
  const itchioY = (540 / 1080) * pageHeight; // Position of itch.io text
  pdf.link(pageWidth / 2 - 65, itchioY - 4, 130, 8, { url: 'https://flamberge-backtrace.itch.io/' });
  
  // Bilibili link (centered)
  const bilibiliY = (650 / 1080) * pageHeight; // Position of bilibili text
  pdf.link(pageWidth / 2 - 77, bilibiliY - 4, 154, 8, { url: 'https://space.bilibili.com/39686351' });

  // Save PDF
  pdf.save('游戏作品集_Game_Portfolio.pdf');
};

// Helper function for text wrapping
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, fontSize: number): string[] {
  const chars = text.split('');
  const lines: string[] = [];
  let line = '';
  
  for (let i = 0; i < chars.length; i++) {
    const testLine = line + chars[i];
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && line.length > 0) {
      lines.push(line);
      line = chars[i];
    } else {
      line = testLine;
    }
  }
  
  if (line.length > 0) {
    lines.push(line);
  }
  
  return lines;
}