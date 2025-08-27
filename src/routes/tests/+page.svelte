<script lang="ts">



</script>

<div class="container flex flex-col gap-2">
    <button class="btn btn-primary">Button</button>

    <button class="btn btn-xs btn-success">Xsmall</button>
    <button class="btn btn-sm btn-neutral">Small</button>
    <button class="btn btn-secondary">Medium</button>
    <button class="btn btn-lg btn-accent">Large</button>
    <button class="btn btn-xl">Xlarge</button>


    <div role="alert" class="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Your purchase has been confirmed!</span>
    </div>

    <select class="m-2 select select-xs border">
        <option disabled selected>Pick a color</option>
        <option>Crimson</option>
        <option>Amber</option>
        <option>Velvet</option>
    </select>

    <div class="flex justify-center items-center gap-1">
        <div aria-label="status" class="status status-primary"></div>
        <div aria-label="status" class="status status-secondary"></div>
        <div aria-label="status" class="status status-accent"></div>
        <div aria-label="status" class="status status-neutral"></div>

        <div aria-label="info" class="status status-info"></div>
        <div aria-label="success" class="status status-success"></div>
        <div aria-label="warning" class="status status-warning"></div>
        <div aria-label="error" class="status status-error"></div>
    </div>


    <ul class="steps steps-vertical">
        <li class="step step-primary">Register</li>
        <li class="step step-primary">Choose plan</li>
        <li class="step">Purchase</li>
        <li class="step">Receive Product</li>
    </ul>

    <div class="overflow-x-auto">
        <ul class="steps">
            <li class="step">start</li>
            <li class="step step-secondary">2</li>
            <li class="step step-secondary">3</li>
            <li class="step step-secondary">4</li>
            <li class="step">5</li>
            <li class="step step-accent">6</li>
            <li class="step step-accent">7</li>
            <li class="step">8</li>
            <li class="step step-error">9</li>
            <li class="step step-error">10</li>
            <li class="step">11</li>
            <li class="step">12</li>
            <li class="step step-warning">13</li>
            <li class="step step-warning">14</li>
            <li class="step">15</li>
            <li class="step step-neutral">16</li>
            <li class="step step-neutral">17</li>
            <li class="step step-neutral">18</li>
            <li class="step step-neutral">19</li>
            <li class="step step-neutral">20</li>
            <li class="step step-neutral">21</li>
            <li class="step step-neutral">22</li>
            <li class="step step-neutral">23</li>
            <li class="step step-neutral">end</li>
        </ul>
    </div>

</div>


<div class="tooltip" data-tip="hello">
    <button class="btn">Hover me</button>
</div>


<footer class="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
    <nav>
        <h6 class="footer-title">Services</h6>
        <a class="link link-hover">Branding</a>
        <a class="link link-hover">Design</a>
        <a class="link link-hover">Marketing</a>
        <a class="link link-hover">Advertisement</a>
    </nav>
    <nav>
        <h6 class="footer-title">Company</h6>
        <a class="link link-hover">About us</a>
        <a class="link link-hover">Contact</a>
        <a class="link link-hover">Jobs</a>
        <a class="link link-hover">Press kit</a>
    </nav>
    <nav>
        <h6 class="footer-title">Legal</h6>
        <a class="link link-hover">Terms of use</a>
        <a class="link link-hover">Privacy policy</a>
        <a class="link link-hover">Cookie policy</a>
    </nav>
</footer>
