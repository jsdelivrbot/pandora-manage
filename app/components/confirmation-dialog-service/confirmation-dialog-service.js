/*global define*/
'use strict';

define([], function () {

	function confirmationDialogFactory($modal) {

		var confirmationModal = function (size, text, cancelButton, isError) {

			var modalInstance = $modal.open({
			  templateUrl: 'common/confirmation-dialog.html',
			  controller: 'ConfirmationDialogController as confirmationDialog',
			  size: size,
			  backdrop: 'static',
			  keyboard: false,
			  resolve: {
					text: function(){ return text; },
					cancelButton: function(){ return cancelButton; },
					isError: function(){ return isError; }
			  }
			});

			modalInstance.result.then(function (selectedItem) {
			  // this.selected = selectedItem;
			}, function () {
			  // $log.info('Modal dismissed at: ' + new Date());
			});

			return modalInstance;

		}

	    return confirmationModal;
	}

	return {'confirmationDialogService': ['$modal',confirmationDialogFactory]};
});
