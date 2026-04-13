// Volatile | Solutions site interactions

window.addEventListener('scroll', function () {
    var header = document.getElementById('ve-sticky');

    if (!header) {
        return;
    }

    header.classList.toggle('scrolled', window.scrollY > 50);
});

var toggler = document.getElementById('ve-toggle');
var mobileMenu = document.getElementById('ve-mobile-menu');

if (toggler && mobileMenu) {
    toggler.addEventListener('click', function () {
        mobileMenu.classList.toggle('open');
    });
}

function animateCounters() {
    var counters = document.querySelectorAll('.counter');

    counters.forEach(function (counter) {
        var target = parseInt(counter.getAttribute('data-count'), 10);
        var count = 0;
        var duration = 2000;
        var step = target / (duration / 16);
        var timer = setInterval(function () {
            count += step;

            if (count >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(count).toLocaleString();
            }
        }, 16);
    });
}

var counterSection = document.querySelector('.ve-counter-section');

if (counterSection) {
    var triggered = false;
    var observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !triggered) {
            triggered = true;
            animateCounters();
        }
    }, { threshold: 0.3 });

    observer.observe(counterSection);
}

document.querySelectorAll('.ve-faq-q').forEach(function (question) {
    question.addEventListener('click', function () {
        var item = this.closest('.ve-faq-item');
        var wasOpen = item.classList.contains('open');

        document.querySelectorAll('.ve-faq-item').forEach(function (entry) {
            entry.classList.remove('open');
        });

        if (!wasOpen) {
            item.classList.add('open');
        }
    });
});

var formMessages = {
    contact: 'Thanks. We captured your inquiry and will follow up with next steps within one business day.',
    newsletter: 'You are subscribed. Future field notes and launch updates will arrive in your inbox.',
    comment: 'Thanks for the note. Comments are moderated before they appear on the page.'
};

document.querySelectorAll('form[data-form-name]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var existingNotice = form.querySelector('.ve-form-feedback');

        if (existingNotice) {
            existingNotice.remove();
        }

        var notice = document.createElement('p');
        var formName = form.getAttribute('data-form-name');
        notice.className = 've-form-feedback';
        notice.setAttribute('role', 'status');
        notice.textContent = formMessages[formName] || 'Thanks. Your submission has been captured.';
        form.appendChild(notice);

        form.reset();
    });
});
