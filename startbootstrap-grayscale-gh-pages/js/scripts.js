/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// ฟังก์ชันสร้างชุดตัวเลขวิน
function getPairs(numbers, size) {
    const result = [];
    const combine = (arr, num, start, initial) => {
        if (num === 0) {
            result.push(initial.join(''));
            return;
        }
        for (let i = start; i < arr.length; i++) {
            combine(arr, num - 1, i + 1, initial.concat(arr[i]));
        }
    };
    combine(numbers, size, 0, []);
    return result;
}

// ฟังก์ชันดึงค่าจาก input และคำนวณทันทีเมื่อพิมพ์
document.getElementById('numbers').addEventListener('input', function() {
    const input = document.getElementById('numbers').value.split('').map(Number).filter(n => !isNaN(n));

    // ตรวจสอบเลขซ้ำ
    const uniqueInput = [...new Set(input)];
    if (uniqueInput.length !== input.length) {
        alert("กรุณากรอกตัวเลขที่ไม่ซ้ำกัน");
        return;
    }

    if (input.length === 0 || input.length > 8) {
        alert("กรุณากรอกตัวเลข 1-8 หลัก");
        return;
    }

    const pair2 = getPairs(input, 2);
    const pair3 = getPairs(input, 3);
    const pair2_double = [...pair2, ...input.map(n => `${n}${n}`)];
    const pair3_double = [...pair3, ...input.map(n => `${n}${n}${n}`)];

    document.getElementById('pair2').textContent = pair2.join(', ');
    document.getElementById('pair3').textContent = pair3.join(', ');
    document.getElementById('pair2_double').textContent = pair2_double.join(', ');
    document.getElementById('pair3_double').textContent = pair3_double.join(', ');
});

// ฟังก์ชันคัดลอกผลลัพธ์
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const text = document.getElementById(targetId).textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = this.textContent;
            this.textContent = 'คัดลอกสำเร็จ';
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000); // เปลี่ยนกลับเป็น "คัดลอก" หลังจาก 2 วินาที
        });
    });
});

// ฟังก์ชันรีเซ็ตค่า
document.getElementById('reset').addEventListener('click', function() {
    document.getElementById('numbers').value = '';
    document.getElementById('pair2').textContent = '';
    document.getElementById('pair3').textContent = '';
    document.getElementById('pair2_double').textContent = '';
    document.getElementById('pair3_double').textContent = '';
});