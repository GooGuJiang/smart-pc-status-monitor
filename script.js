document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const resultContainer = document.getElementById('resultContainer');
    const container = document.querySelector('.container');
    
    // 初始化时隐藏结果容器
    resultContainer.classList.add('hidden');
    
    // 设置元素为可见
    makeElementsVisible();
    
    startButton.addEventListener('click', function() {
        // 模拟检测过程
        startButton.disabled = true;
        startButton.textContent = '检测中...';
        
        // 显示结果容器并添加动画效果
        resultContainer.classList.remove('hidden', 'success');
        resultContainer.classList.add('detecting');
        resultContainer.textContent = '正在检测...';
        
        // 添加进度条
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        resultContainer.style.position = 'relative';
        resultContainer.appendChild(progressBar);
        
        // GSAP动画 - 容器震动
        gsap.to(container, {
            duration: 0.1,
            x: 5,
            yoyo: true,
            repeat: 10,
            ease: "power1.inOut"
        });
        
        // GSAP动画 - 显示结果容器
        gsap.fromTo(resultContainer, 
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
        );
        
        // GSAP动画 - 进度条动画
        gsap.to(progressBar, {
            width: "100%",
            duration: 2,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true
        });
        
        // 添加一个随机延迟，使其看起来像是在进行检测
        const delay = Math.random() * 1500 + 2500; // 2.5-4秒之间的随机延迟
        
        setTimeout(() => {
            // 停止进度条动画
            gsap.killTweensOf(progressBar);
            progressBar.remove();
            
            // 移除检测中的样式
            resultContainer.classList.remove('detecting');
            
            // 添加成功的样式
            resultContainer.classList.add('success');
            
            // 创建结果内容容器
            const successContent = document.createElement('div');
            successContent.className = 'success-content';
            
            // 创建表情符号
            const emoji = document.createElement('span');
            emoji.className = 'emoji';
            emoji.textContent = '✓';
            
            // 创建成功消息
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = '检测完成';
            
            // 创建详细信息
            const successDetails = document.createElement('div');
            successDetails.className = 'success-details';
            successDetails.textContent = '恭喜你，你的电脑当前为开机状态！';
            
            // 清空并添加新内容
            resultContainer.innerHTML = '';
            successContent.appendChild(emoji);
            successContent.appendChild(successMessage);
            successContent.appendChild(successDetails);
            resultContainer.appendChild(successContent);
            
            // GSAP动画 - 结果容器成功动画
            gsap.fromTo(resultContainer, 
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.7, ease: "elastic.out(1, 0.3)" }
            );
            
            // 创建GSAP时间线用于动画序列
            const tl = gsap.timeline({delay: 0.2});
            
            // GSAP动画 - 旋转表情符号并缩放
            tl.fromTo(emoji, 
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
            );
            
            // GSAP动画 - 文字淡入
            tl.fromTo(successMessage, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5 },
                "-=0.3"
            );
            
            tl.fromTo(successDetails, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5 },
                "-=0.3"
            );
            
            // 添加闪光效果
            addGlowEffect(resultContainer);
            
            // 重置按钮状态
            startButton.textContent = '再次检测';
            startButton.disabled = false;
            
            // GSAP动画 - 按钮弹跳
            gsap.fromTo(startButton, 
                { scale: 0.9 },
                { scale: 1, duration: 0.5, ease: "elastic.out(1.2, 0.3)" }
            );
        }, delay);
    });
    
    // 添加闪光效果
    function addGlowEffect(element) {
        // 创建闪光元素
        const glow = document.createElement('div');
        glow.style.position = 'absolute';
        glow.style.top = '0';
        glow.style.left = '0';
        glow.style.width = '100%';
        glow.style.height = '100%';
        glow.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        glow.style.borderRadius = '8px';
        glow.style.pointerEvents = 'none';
        
        // 添加到容器
        element.appendChild(glow);
        
        // 动画效果
        gsap.to(glow, {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                glow.remove();
            }
        });
    }
    
    // 设置元素为可见
    function makeElementsVisible() {
        // 直接设置所有元素为可见，不使用动画
        gsap.set('.container, h1, .subtitle, .button-container, .footer', { opacity: 1 });
        
        // 取消按钮的脉冲动画
        gsap.set('.start-button', { scale: 1 });
    }
}); 