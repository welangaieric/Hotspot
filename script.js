document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const submitBtn = document.getElementById('submitBtn');
    const packageModal = document.getElementById('packageModal');
    const selfcareModal = document.getElementById('selfcareModal');
    const selfcareBtn = document.getElementById('selfcareBtn');
    const closeBtns = document.querySelectorAll('.close');
    const packages = document.querySelectorAll('.package');
    const modalSubmit = document.getElementById('modalSubmit');

    // Auto uppercase input
    usernameInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase();
    });

    // Open package modal
    packages.forEach(package => {
        package.addEventListener('click', () => {
            const packageName = package.dataset.package;
            const packageTitle = document.getElementById('packageTitle');
            const packageDescription = document.getElementById('packageDescription');

            packageTitle.textContent = package.querySelector('h3').textContent;
            packageDescription.textContent = getPackageDescription(packageName);

            packageModal.style.display = 'block';
        });
    });

    // Open selfcare modal
    selfcareBtn.addEventListener('click', () => {
        populateSelfcareData();
        selfcareModal.style.display = 'block';
    });

    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            packageModal.style.display = 'none';
            selfcareModal.style.display = 'none';
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === packageModal || e.target === selfcareModal) {
            packageModal.style.display = 'none';
            selfcareModal.style.display = 'none';
        }
    });

    // Submit package form
    modalSubmit.addEventListener('click', () => {
        const phoneInput = document.getElementById('phone');
        if (phoneInput.value) {
            alert('Thank you for your submission!');
            packageModal.style.display = 'none';
            phoneInput.value = '';
        } else {
            alert('Please enter your phone number.');
        }
    });

    function getPackageDescription(packageName) {
        const descriptions = {
            basic: 'Our Basic Package includes 5GB data, 100 minutes, and 100 SMS per month.',
            standard: 'The Standard Package offers 20GB data, unlimited minutes, and unlimited SMS.',
            premium: 'Our Premium Package provides 50GB data, unlimited minutes, unlimited SMS, and free international roaming.'
        };
        return descriptions[packageName] || 'Package description not available.';
    }

    function populateSelfcareData() {
        const transactionList = document.getElementById('transactionList');
        const voucherList = document.getElementById('voucherList');
        const rewardStatus = document.getElementById('rewardStatus');

        // Sample data - replace with actual data fetching logic
        const transactions = [
            { date: '2023-05-01', amount: '$20', type: 'Recharge' },
            { date: '2023-04-28', amount: '$5', type: 'Data Pack' },
            { date: '2023-04-25', amount: '$10', type: 'Voice Pack' }
        ];

        const vouchers = [
            { code: 'GREEN10', discount: '10%', validUntil: '2023-05-31' },
            { code: 'SUMMER20', discount: '20%', validUntil: '2023-06-30' }
        ];

        transactionList.innerHTML = transactions.map(t => 
            `<li>${t.date}: ${t.type} - ${t.amount}</li>`
        ).join('');

        voucherList.innerHTML = vouchers.map(v => 
            `<li>Code: ${v.code} (${v.discount} off) - Valid until ${v.validUntil}</li>`
        ).join('');

        rewardStatus.textContent = 'You are eligible for a reward! Redeem 500 points for a free 1GB data pack.';
    }
});