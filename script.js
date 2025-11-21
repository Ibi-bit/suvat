import * as suvat from 'suvat';


document.addEventListener("DOMContentLoaded", function() {
    // Theme initialization
    const themeToggle = document.getElementById('theme-toggle');
    function getSavedTheme() {
        try { return localStorage.getItem('theme'); } catch(e){ return null; }
    }
    function saveTheme(t){ try { localStorage.setItem('theme', t); } catch(e){} }
    function prefersDark() { return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; }
    function applyTheme(theme){
        if(theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
        else document.documentElement.removeAttribute('data-theme');
        updateToggleIcon(theme);
    }
    function updateToggleIcon(theme){ if(!themeToggle) return; themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙'; }

    // decide initial theme
    let theme = getSavedTheme();
    if(!theme) theme = prefersDark() ? 'dark' : 'light';
    applyTheme(theme);

    if(themeToggle){
        themeToggle.addEventListener('click', function(){
            const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            saveTheme(next);
        });
    }

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        themeToggle.textContent = '☀️ Light Mode';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.add('theme-switching');
        
        if (body.classList.contains('dark')) {
            body.classList.remove('dark');
            themeToggle.textContent = '🌙 Dark Mode';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark');
            themeToggle.textContent = '☀️ Light Mode';
            localStorage.setItem('theme', 'dark');
        }
        
        setTimeout(() => {
            body.classList.remove('theme-switching');
        }, 500);
    });
});

var displacement1dInput = document.getElementById("s1d");
var initialVelocity1dInput = document.getElementById("u1d");
var finalVelocity1dInput = document.getElementById("v1d");
var acceleration1dInput = document.getElementById("a1d");
var time1dInput = document.getElementById("t1d");

if (displacement1dInput) {
    displacement1dInput.addEventListener("input", calculateValues1d);
    initialVelocity1dInput.addEventListener("input", calculateValues1d);
    finalVelocity1dInput.addEventListener("input", calculateValues1d);
    acceleration1dInput.addEventListener("input", calculateValues1d);
    time1dInput.addEventListener("input", calculateValues1d);
}

var calculate1dButton = document.getElementById("calculate1d");
if (calculate1dButton) {
    calculate1dButton.addEventListener("click", calculateValues1d);
}

// Universal Reset Button Handler
document.querySelectorAll('.reset-btn').forEach(resetBtn => {
    resetBtn.addEventListener('click', function() {
        const tabType = this.getAttribute('data-tab');
        
        if (tabType === 'onedim') {
            // Reset 1D calculator
            displacement1dInput.value = "";
            initialVelocity1dInput.value = "";
            finalVelocity1dInput.value = "";
            acceleration1dInput.value = "";
            time1dInput.value = "";
            document.getElementById("output1d").textContent = "";
        } 
        else if (tabType === 'twodim') {
            // Reset 2D calculator
            u0Input.value = "";
            angleInput.value = "";
            h0Input.value = "";
            uxInput.value = "";
            vxInput.value = "";
            sxInput.value = "";
            uyInput.value = "";
            vyInput.value = "";
            syInput.value = "";
            ayInput.value = "-9.81";
            t2dInput.value = "";
            rangeInput.value = "";
            maxheightInput.value = "";
            if (timetopeakInput) timetopeakInput.value = "";
            document.getElementById("output2d").textContent = "";
        }
    });
});


function calculateValues1d() {
    var s = parseFloat(displacement1dInput.value);
    var u = parseFloat(initialVelocity1dInput.value);
    var v = parseFloat(finalVelocity1dInput.value);
    var a = parseFloat(acceleration1dInput.value);
    var t = parseFloat(time1dInput.value);

    
    var data = {};
    if (!isNaN(s)) data.s = s;
    if (!isNaN(u)) data.u = u;
    if (!isNaN(v)) data.v = v;
    if (!isNaN(a)) data.a = a;
    if (!isNaN(t)) data.t = t;

    
    var result = suvat.complete(data);
    
    if (result) {
        
        if (!isNaN(result.s)) displacement1dInput.value = result.s.toFixed(2);
        if (!isNaN(result.u)) initialVelocity1dInput.value = result.u.toFixed(2);
        if (!isNaN(result.v)) finalVelocity1dInput.value = result.v.toFixed(2);
        if (!isNaN(result.a)) acceleration1dInput.value = result.a.toFixed(2);
        if (!isNaN(result.t)) time1dInput.value = result.t.toFixed(2);
        
        document.getElementById("output1d").textContent = "";
    } else {
        document.getElementById("output1d").textContent = "Please provide at least three known values to calculate the unknowns.";
    }
}

// Two Dimension Calculator (2D Projectile Motion)
var u0Input = document.getElementById("u0");
var angleInput = document.getElementById("angle");
var h0Input = document.getElementById("h0");
var uxInput = document.getElementById("ux");
var vxInput = document.getElementById("vx");
var sxInput = document.getElementById("sx");
var uyInput = document.getElementById("uy");
var vyInput = document.getElementById("vy");
var syInput = document.getElementById("sy");
var ayInput = document.getElementById("ay");
var t2dInput = document.getElementById("t2d");
var rangeInput = document.getElementById("range");
var maxheightInput = document.getElementById("maxheight");
var timetopeakInput = document.getElementById("timetopeak");


if (u0Input) {
    u0Input.addEventListener("input", calculateValues2d);
    angleInput.addEventListener("input", calculateValues2d);
    h0Input.addEventListener("input", calculateValues2d);
    uxInput.addEventListener("input", calculateValues2d);
    vxInput.addEventListener("input", calculateValues2d);
    sxInput.addEventListener("input", calculateValues2d);
    uyInput.addEventListener("input", calculateValues2d);
    vyInput.addEventListener("input", calculateValues2d);
    syInput.addEventListener("input", calculateValues2d);
    ayInput.addEventListener("input", calculateValues2d);
    t2dInput.addEventListener("input", calculateValues2d);
}


var calculate2dButton = document.getElementById("calculate2d");
if (calculate2dButton) {
    calculate2dButton.addEventListener("click", calculateValues2d);
}


function calculateValues2d() {
    var u0 = parseFloat(u0Input.value);
    var angle = parseFloat(angleInput.value);
    var h0 = parseFloat(h0Input.value) || 0;
    var ux = parseFloat(uxInput.value);
    var vx = parseFloat(vxInput.value);
    var sx = parseFloat(sxInput.value);
    var uy = parseFloat(uyInput.value);
    var vy = parseFloat(vyInput.value);
    var sy = parseFloat(syInput.value);
    var ay = parseFloat(ayInput.value) || -9.81;
    var t = parseFloat(t2dInput.value);

    
    var angleRad = !isNaN(angle) ? (angle * Math.PI / 180) : NaN;

    
    if (!isNaN(u0) && !isNaN(angleRad)) {
        uxInput.value = (u0 * Math.cos(angleRad)).toFixed(2);
        uyInput.value = (u0 * Math.sin(angleRad)).toFixed(2);
        ux = u0 * Math.cos(angleRad);
        uy = u0 * Math.sin(angleRad);
    }

    
    if (!isNaN(ux) && !isNaN(uy) && isNaN(u0)) {
        u0 = Math.sqrt(ux * ux + uy * uy);
        u0Input.value = u0.toFixed(2);
        var calculatedAngle = Math.atan2(uy, ux) * 180 / Math.PI;
        angleInput.value = calculatedAngle.toFixed(2);
    }

    
    if (!isNaN(ux) && !isNaN(t) && isNaN(sx)) {
        sx = ux * t;
        sxInput.value = sx.toFixed(2);
    }
    else if (!isNaN(sx) && !isNaN(t) && isNaN(ux)) {
        ux = sx / t;
        uxInput.value = ux.toFixed(2);
    }
    else if (!isNaN(sx) && !isNaN(ux) && isNaN(t)) {
        t = sx / ux;
        t2dInput.value = t.toFixed(2);
    }

    
    if (!isNaN(uy) && !isNaN(ay) && !isNaN(t) && isNaN(sy)) {
        sy = uy * t + 0.5 * ay * t * t;
        syInput.value = sy.toFixed(2);
    }
    else if (!isNaN(uy) && !isNaN(vy) && !isNaN(t) && isNaN(ay)) {
        ay = (vy - uy) / t;
        ayInput.value = ay.toFixed(2);
    }
    else if (!isNaN(uy) && !isNaN(ay) && !isNaN(t) && isNaN(vy)) {
        vy = uy + ay * t;
        vyInput.value = vy.toFixed(2);
    }
    else if (!isNaN(vy) && !isNaN(ay) && !isNaN(t) && isNaN(uy)) {
        uy = vy - ay * t;
        uyInput.value = uy.toFixed(2);
    }
    else if (!isNaN(sy) && !isNaN(uy) && !isNaN(ay) && isNaN(t)) {
        
        var a = 0.5 * ay;
        var b = uy;
        var c = -sy;
        var discriminant = b * b - 4 * a * c;
        if (discriminant >= 0) {
            var t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            var t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            t = Math.max(t1, t2); 
            t2dInput.value = t.toFixed(2);
        }
    }

    
    if (!isNaN(ux) && !isNaN(uy) && !isNaN(ay)) {
        
        var timeToPeak = -uy / ay;
        if (timeToPeak > 0 && timetopeakInput) {
            timetopeakInput.value = timeToPeak.toFixed(2);
        }

        
        var maxHeight = h0 + (uy * uy) / (-2 * ay);
        if (maxHeight >= 0) {
            maxheightInput.value = maxHeight.toFixed(2);
        }


        if (!isNaN(h0)) {
            var a = 0.5 * ay;
            var b = uy;
            var c = h0;
            var discriminant = b * b - 4 * a * c;
            if (discriminant >= 0) {
                var t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
                var t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
                var totalTime = Math.max(t1, t2);
                
                
                var range = ux * totalTime;
                if (range >= 0) {
                    rangeInput.value = range.toFixed(2);
                }
            }
        }
    }
}